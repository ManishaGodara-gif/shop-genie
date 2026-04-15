const fetchResults = async (query) => {
  if (!query.trim()) { setResults([]); return; }
  setLoading(true);
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setResults(data.success ? data.products : []);
  } catch (err) {
    console.error("Search error:", err);
    setResults([]);
  } finally {
    setLoading(false);
  }
};