import productModel from "../models/productModel.js";
import { rankProducts } from "../utils/tfidf.js";

const smartSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.json({ success: true, products: [] });
    }

    const allProducts = await productModel.find({ available: true });

    // Price filter from query e.g. "under 1000", "below 500"
    const priceMatch = q.match(/(?:under|below|less than|upto)\s*[₹]?(\d+)/i);
    let filtered = allProducts;
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1]);
      filtered = allProducts.filter((p) => p.price <= maxPrice);
    }

    const ranked = rankProducts(q, filtered);

    res.json({ success: true, products: ranked.slice(0, 12) });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default smartSearch;