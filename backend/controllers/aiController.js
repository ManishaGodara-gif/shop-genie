/*import productModel from '../models/productModel.js'

export const askShopGenie = async (req, res) => {
    try {
        const { query } = req.body

        const products = await productModel.find({}).limit(50)
        const productList = products.map(p => ({
            id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            subCategory: p.subCategory
        }))

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1000,
                system: `You are ShopGenie, an AI shopping assistant. Given a user query and a list of products, identify the user's intent (budget, category, style/occasion) and return the top 5 most relevant product IDs with a short reason.
Respond ONLY in this exact JSON format, no extra text, no markdown:
{
  "intent": { "budget": null, "category": null, "style": null },
  "results": [{ "id": "product_id_here", "reason": "why this matches" }]
}`,
                messages: [{
                    role: 'user',
                    content: `Query: "${query}"\n\nProducts: ${JSON.stringify(productList)}`
                }]
            })
        })

        const data = await response.json()
        console.log("claude response:", JSON.stringify(data))
        const raw = data.content[0].text.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(raw)

        const resultIds = parsed.results.map(r => r.id)
        const matched = await productModel.find({ _id: { $in: resultIds } })

        const finalResults = parsed.results.map(r => {
            const product = matched.find(p => p._id.toString() === r.id)
            return product ? { ...product.toObject(), reason: r.reason } : null
        }).filter(Boolean)

        res.json({ success: true, intent: parsed.intent, results: finalResults })

    } catch (err) {
        console.error('ShopGenie AI Error:', err)
        res.json({ success: false, message: err.message })
    }
}*/
import productModel from '../models/productModel.js'
import { rankProducts } from '../utils/tfidf.js'

// ─── Rule-Based Intent Extractor ─────────────────────────────
function extractIntent(query) {
  const q = query.toLowerCase()

  // Budget: "under 1000", "below 500", "less than 2000", "upto 800"
  const budgetMatch = q.match(/(?:under|below|less than|upto|up to|within)\s*[₹rs.]?\s*(\d+)/i)
  const budget = budgetMatch ? parseInt(budgetMatch[1]) : null

  // Category mapped from keywords
  const categoryMap = {
    'Topwear': ['top', 'tops', 'shirt', 'shirts', 't-shirt', 'tshirt', 'blouse',
                'kurta', 'kurti', 'tunic', 'sweater', 'hoodie', 'jacket', 'coat', 'sweatshirt'],
    'Bottomwear': ['jeans', 'trouser', 'trousers', 'pants', 'skirt',
                   'leggings', 'shorts', 'palazzos', 'bottom'],
    'Winterwear': ['jacket', 'coat', 'sweater', 'hoodie', 'sweatshirt',
                   'cardigan', 'shawl', 'muffler', 'warm'],
  }

  let category = null
  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (keywords.some(k => q.includes(k))) { category = cat; break }
  }

  // Style / occasion
  const styleKeywords = [
    'casual', 'formal', 'party', 'college', 'office', 'ethnic',
    'western', 'festive', 'wedding', 'beach', 'sports', 'gym', 'traditional'
  ]
  const style = styleKeywords.find(s => q.includes(s)) || null

  return { budget, category, style }
}

// ─── Reason Generator ────────────────────────────────────────
function generateReason(product, intent) {
  const reasons = []

  if (intent.budget && product.price <= intent.budget)
    reasons.push(`within budget of Rs.${intent.budget}`)

  if (intent.category &&
      (product.category?.toLowerCase().includes(intent.category.toLowerCase()) ||
       product.subCategory?.toLowerCase().includes(intent.category.toLowerCase())))
    reasons.push(`${intent.category} category`)

  if (intent.style)
    reasons.push(`great for ${intent.style}`)

  if (product.bestseller)
    reasons.push('bestseller pick')

  return reasons.length > 0
    ? reasons.join(' · ')
    : 'closely matches your search'
}

// ─── Main Controller ─────────────────────────────────────────
export const askShopGenie = async (req, res) => {
  try {
    const { query } = req.body
    if (!query?.trim()) {
      return res.json({ success: false, message: 'Query is required' })
    }

    const allProducts = await productModel.find({})
    const intent = extractIntent(query)

    // Filter by budget if detected, fallback to all if nothing in range
    let filtered = allProducts
    if (intent.budget) {
      const budgetFiltered = allProducts.filter(p => p.price <= intent.budget)
      filtered = budgetFiltered.length > 0 ? budgetFiltered : allProducts
    }

    // Rank using TF-IDF cosine similarity
    const ranked = rankProducts(query, filtered)
    const top5 = ranked.slice(0, 5)

    // Attach reason to each result
    const results = top5.map(p => ({
      ...p.toObject(),
      reason: generateReason(p, intent)
    }))

    res.json({ success: true, intent, results })

  } catch (err) {
    console.error('ShopGenie Error:', err)
    res.json({ success: false, message: err.message })
  }
}