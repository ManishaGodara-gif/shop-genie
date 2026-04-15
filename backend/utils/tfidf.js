/*function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s₹]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function computeTF(tokens) {
  const tf = {};
  tokens.forEach((t) => (tf[t] = (tf[t] || 0) + 1));
  Object.keys(tf).forEach((t) => (tf[t] /= tokens.length));
  return tf;
}

function computeIDF(documents) {
  const idf = {};
  const N = documents.length;
  documents.forEach((doc) => {
    const unique = new Set(doc);
    unique.forEach((t) => (idf[t] = (idf[t] || 0) + 1));
  });
  Object.keys(idf).forEach((t) => (idf[t] = Math.log(N / idf[t]) + 1));
  return idf;
}

function cosineSimilarity(vecA, vecB, terms) {
  let dot = 0, magA = 0, magB = 0;
  terms.forEach((t) => {
    const a = vecA[t] || 0;
    const b = vecB[t] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  });
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

function rankProducts(query, products) {
  // Build document strings — name gets 3x weight
  const docs = products.map((p) => {
    const text = [
      p.name, p.name, p.name,          // weighted
      p.description,
      p.category,
      p.subCategory,
      p.bestseller ? "bestseller best seller popular" : "",
      p.sizes?.join(" ") || "",
    ].join(" ");
    return tokenize(text);
  });

  const queryTokens = tokenize(query);
  const idf = computeIDF([...docs, queryTokens]);

  // Build TF-IDF vectors
  const allTerms = Object.keys(idf);

  const queryTF = computeTF(queryTokens);
  const queryVec = {};
  allTerms.forEach((t) => (queryVec[t] = (queryTF[t] || 0) * (idf[t] || 0)));

  const scored = products.map((product, i) => {
    const tf = computeTF(docs[i]);
    const docVec = {};
    allTerms.forEach((t) => (docVec[t] = (tf[t] || 0) * (idf[t] || 0)));
    const score = cosineSimilarity(queryVec, docVec, allTerms);
    return { product, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.product);
}

export { rankProducts };*/
// ─── TF-IDF Semantic Search Utility ──────────────────────────
// Used by ShopGenie for free, API-key-free product ranking

function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function computeTF(tokens) {
  const tf = {}
  tokens.forEach(t => (tf[t] = (tf[t] || 0) + 1))
  Object.keys(tf).forEach(t => (tf[t] /= tokens.length))
  return tf
}

function computeIDF(documents) {
  const idf = {}
  const N = documents.length
  documents.forEach(doc => {
    const unique = new Set(doc)
    unique.forEach(t => (idf[t] = (idf[t] || 0) + 1))
  })
  Object.keys(idf).forEach(t => (idf[t] = Math.log(N / idf[t]) + 1))
  return idf
}

function cosineSimilarity(vecA, vecB, terms) {
  let dot = 0, magA = 0, magB = 0
  terms.forEach(t => {
    const a = vecA[t] || 0
    const b = vecB[t] || 0
    dot += a * b
    magA += a * a
    magB += b * b
  })
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0
}

export function rankProducts(query, products) {
  if (!products.length) return []

  // Build document text — name gets 3x weight for better relevance
  const docs = products.map(p => {
    const text = [
      p.name, p.name, p.name,
      p.description || '',
      p.category || '',
      p.subCategory || '',
      p.bestseller ? 'bestseller best seller popular trending' : '',
      Array.isArray(p.sizes) ? p.sizes.join(' ') : ''
    ].join(' ')
    return tokenize(text)
  })

  const queryTokens = tokenize(query)
  const idf = computeIDF([...docs, queryTokens])
  const allTerms = Object.keys(idf)

  const queryTF = computeTF(queryTokens)
  const queryVec = {}
  allTerms.forEach(t => (queryVec[t] = (queryTF[t] || 0) * (idf[t] || 0)))

  const scored = products.map((product, i) => {
    const tf = computeTF(docs[i])
    const docVec = {}
    allTerms.forEach(t => (docVec[t] = (tf[t] || 0) * (idf[t] || 0)))
    const score = cosineSimilarity(queryVec, docVec, allTerms)
    return { product, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .map(s => s.product)
}