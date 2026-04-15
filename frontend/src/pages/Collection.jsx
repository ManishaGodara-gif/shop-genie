import { useState, useEffect } from 'react'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'

const CATEGORIES    = ['Men', 'Women', 'Kids']
const SUB_CATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear']
const SORT_OPTIONS  = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'low-high',  label: 'Price: Low → High' },
    { value: 'high-low',  label: 'Price: High → Low' }
]

const Collection = () => {
    const { products, search, showSearch } = useShop()
    const [filters, setFilters] = useState({ categories: [], subCategories: [] })
    const [sort, setSort]       = useState('relevant')
    const [filtered, setFiltered] = useState([])

    const toggle = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(v => v !== value)
                : [...prev[key], value]
        }))
    }

    useEffect(() => {
        let result = [...products]

        // Search filter
        if (showSearch && search)
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

        // Category filter
        if (filters.categories.length > 0)
            result = result.filter(p => filters.categories.includes(p.category))

        // Sub-category filter
        if (filters.subCategories.length > 0)
            result = result.filter(p => filters.subCategories.includes(p.subCategory))

        // Sort
        if (sort === 'low-high')  result.sort((a, b) => a.price - b.price)
        if (sort === 'high-low')  result.sort((a, b) => b.price - a.price)

        setFiltered(result)
    }, [products, filters, sort, search, showSearch])

    const CheckItem = ({ label, checked, onChange }) => (
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <input type="checkbox" checked={checked} onChange={onChange}
                style={{ width: 'auto', accentColor: 'var(--primary)' }} />
            {label}
        </label>
    )

    return (
        <div className="container section" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            {/* ── Sidebar Filters ──────────────────────────────── */}
            <aside style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '84px' }}>
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Filters
                    </h3>

                    <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Category</h4>
                    {CATEGORIES.map(cat => (
                        <CheckItem key={cat} label={cat}
                            checked={filters.categories.includes(cat)}
                            onChange={() => toggle('categories', cat)} />
                    ))}

                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

                    <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Type</h4>
                    {SUB_CATEGORIES.map(sub => (
                        <CheckItem key={sub} label={sub}
                            checked={filters.subCategories.includes(sub)}
                            onChange={() => toggle('subCategories', sub)} />
                    ))}
                </div>
            </aside>

            {/* ── Product Grid ─────────────────────────────────── */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                    </p>
                    <select value={sort} onChange={e => setSort(e.target.value)}
                        style={{ width: 'auto', padding: '0.5rem 1rem' }}>
                        {SORT_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

                {filtered.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1.5rem' }}>
                        {filtered.map(p => <ProductCard key={p._id} {...p} />)}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-light)' }}>
                        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
                        <p>No products found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Collection
