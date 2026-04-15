import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ShopGenieSearch = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [intent, setIntent] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleAsk = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResults([])
    setIntent(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      if (data.success) {
        setResults(data.results)
        setIntent(data.intent)
      } else {
        setError('ShopGenie could not process your request.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="shopgenie-wrapper px-4 sm:px-10 py-8">
      {/* Search Bar */}
      <div className="flex gap-2 items-center border-2 border-gray-800 rounded-full px-5 py-3 max-w-2xl mx-auto">
        <span className="text-lg">✨</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          placeholder='Try: "casual shoes under ₹1000" or "outfit for college"'
          className="flex-1 outline-none text-sm text-gray-700"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      {/* Intent Tag */}
      {intent && (
        <div className="flex gap-2 justify-center mt-4 flex-wrap text-xs">
          {intent.budget && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              💰 Budget: ₹{intent.budget}
            </span>
          )}
          {intent.category && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              🏷️ {intent.category}
            </span>
          )}
          {intent.style && (
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              ✨ {intent.style}
            </span>
          )}
        </div>
      )}
        {error && <p className="text-center text-red-500 text-sm mt-4">{error}</p>}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <p className="text-center text-gray-500 text-sm mb-6">
            ShopGenie found <strong>{results.length}</strong> products for you
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {results.map(product => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={product.image?.[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-sm text-gray-700 mt-1">₹{product.price}</p>
                  <p className="text-xs text-purple-600 mt-2 italic">{product.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopGenieSearch