import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token, backendUrl }) => {
    const [products, setProducts] = useState([])
    const [search,   setSearch]   = useState('')

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/list`)
            if (data.success) setProducts(data.products)
        } catch (err) { toast.error(err.message) }
    }

    const removeProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return
        try {
            const { data } = await axios.delete(`${backendUrl}/api/product/remove`,
                { data: { id }, headers: { token } })
            if (data.success) { toast.success('Product removed'); fetchProducts() }
            else toast.error(data.message)
        } catch (err) { toast.error(err.message) }
    }

    useEffect(() => { fetchProducts() }, [])

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1a2b4a' }}>
                    Products <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 400 }}>({products.length})</span>
                </h2>
                <input placeholder="🔍 Search by name or category..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    style={{ width: '280px' }} />
            </div>

            {/* Table Header */}
            <div style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px 100px 60px',
                padding: '0.6rem 1rem', background: '#f1f5f9',
                borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b',
                marginBottom: '0.5rem'
            }}>
                <span>Image</span><span>Product</span><span>Category</span>
                <span>Type</span><span>Price</span><span>Delete</span>
            </div>

            {filtered.length === 0 && (
                <p style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No products found.</p>
            )}

            {filtered.map(product => (
                <div key={product._id} style={{
                    display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px 100px 60px',
                    alignItems: 'center', padding: '0.75rem 1rem',
                    background: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: '8px', marginBottom: '0.5rem',
                    transition: 'box-shadow 0.15s'
                }}>
                    <img src={product.image[0]} alt={product.name}
                        style={{ width: '48px', height: '56px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                    <div>
                        <p style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{product.name}</p>
                        {product.bestseller && (
                            <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#b45309', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                                ⭐ Bestseller
                            </span>
                        )}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#475569' }}>{product.category}</span>
                    <span style={{ fontSize: '0.85rem', color: '#475569' }}>{product.subCategory}</span>
                    <span style={{ fontWeight: 600, color: '#1a2b4a' }}>₹{product.price.toLocaleString()}</span>
                    <button onClick={() => removeProduct(product._id)}
                        style={{ background: 'none', fontSize: '1.1rem', color: '#ef4444', padding: '0.25rem', transition: 'transform 0.15s' }}
                        title="Delete product">
                        🗑
                    </button>
                </div>
            ))}
        </div>
    )
}

export default List
