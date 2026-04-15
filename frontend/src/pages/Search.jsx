import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import useScrollReveal from '../hooks/useScrollReveal'
import ShopGenieSearch from '../components/ShopGenieSearch'

const PRICE_RANGES = [
    { label: 'All Prices',     min: 0,    max: Infinity },
    { label: 'Under ₹500',    min: 0,    max: 500 },
    { label: '₹500 – ₹1500',  min: 500,  max: 1500 },
    { label: '₹1500 – ₹3000', min: 1500, max: 3000 },
    { label: 'Above ₹3000',   min: 3000, max: Infinity },
]

const Search = () => {
    const { products } = useShop()
    const [searchParams, setSearchParams] = useSearchParams()
    const { ref, visible } = useScrollReveal(0.05)

    const [mode,       setMode]       = useState('normal')
    const [query,      setQuery]      = useState(searchParams.get('q') || '')
    const [category,   setCategory]   = useState('All')
    const [priceRange, setPriceRange] = useState(0)
    const [sort,       setSort]       = useState('relevant')
    const [results,    setResults]    = useState([])

    useEffect(() => {
        const q = query.trim().toLowerCase()
        let filtered = [...products]

        if (q) filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.subCategory.toLowerCase().includes(q)
        )

        if (category !== 'All') filtered = filtered.filter(p => p.category === category)

        const range = PRICE_RANGES[priceRange]
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max)

        if (sort === 'low-high')  filtered.sort((a, b) => a.price - b.price)
        if (sort === 'high-low')  filtered.sort((a, b) => b.price - a.price)
        if (sort === 'newest')    filtered.sort((a, b) => b.date - a.date)

        setResults(filtered)
        setSearchParams(q ? { q } : {}, { replace: true })
    }, [query, category, priceRange, sort, products])

    const FilterChip = ({ label, active, onClick }) => (
        <button onClick={onClick} style={{
            padding: '0.4rem 1rem', borderRadius: '20px',
            border: '1.5px solid ' + (active ? 'var(--primary)' : 'var(--border)'),
            background: active ? 'var(--primary)' : '#fff',
            color: active ? '#fff' : 'var(--text)',
            fontSize: '0.8rem', fontWeight: 500,
            cursor: 'pointer', transition: 'all 0.18s ease',
            fontFamily: 'var(--font-body)',
            transform: active ? 'scale(1.05)' : 'scale(1)'
        }}>
            {label}
        </button>
    )

    return (
        <div>
            {/* ── Mode Toggle ────────────────────────────────── */}
            <div style={{
                display: 'flex', justifyContent: 'center',
                gap: '0.75rem', padding: '1.25rem',
                background: '#f9f9f9', borderBottom: '1px solid var(--border)'
            }}>
                <button onClick={() => setMode('normal')} style={{
                    padding: '0.5rem 1.5rem', borderRadius: '50px',
                    background: mode === 'normal' ? 'var(--primary)' : '#fff',
                    color: mode === 'normal' ? '#fff' : 'var(--text)',
                    border: '1.5px solid var(--primary)',
                    fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}>🔍 Normal Search</button>
                <button onClick={() => setMode('ai')} style={{
                    padding: '0.5rem 1.5rem', borderRadius: '50px',
                    background: mode === 'ai' ? 'var(--primary)' : '#fff',
                    color: mode === 'ai' ? '#fff' : 'var(--text)',
                    border: '1.5px solid var(--primary)',
                    fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}>✨ Ask ShopGenie</button>
            </div>

            {/* ── AI Mode ────────────────────────────────────── */}
            {mode === 'ai' ? <ShopGenieSearch /> : (
                <>
                    {/* ── Hero Search Bar ──────────────────────── */}
                    <section style={{
                        background: 'linear-gradient(135deg, var(--primary), #253d6b)',
                        padding: '3rem 0', textAlign: 'center'
                    }}>
                        <div className="container">
                            <h1 className="animate-fade-up" style={{
                                color: '#fff', fontSize: '2.2rem',
                                marginBottom: '1.5rem', fontFamily: 'var(--font-display)'
                            }}>
                                Find Your Perfect Style 🔍
                            </h1>
                            <div className="animate-fade-up" style={{
                                display: 'flex', maxWidth: '580px', margin: '0 auto',
                                background: '#fff', borderRadius: '50px',
                                overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                animationDelay: '0.1s'
                            }}>
                                <span style={{ padding: '0 1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', color: 'var(--text-light)' }}>🔍</span>
                                <input
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Search for dresses, shirts, jeans..."
                                    style={{
                                        flex: 1, border: 'none', outline: 'none',
                                        fontSize: '1rem', padding: '0.9rem 0',
                                        fontFamily: 'var(--font-body)', background: 'transparent'
                                    }}
                                />
                                {query && (
                                    <button onClick={() => setQuery('')}
                                        style={{ padding: '0 1.2rem', background: 'none', color: 'var(--text-light)', fontSize: '1.1rem' }}>
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* ── Filters Bar ──────────────────────────── */}
                    <section style={{
                        background: '#fff', borderBottom: '1px solid var(--border)',
                        padding: '1rem 0', position: 'sticky', top: '68px', zIndex: 50
                    }}>
                        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '0.25rem' }}>
                                    Category:
                                </span>
                                {['All', 'Men', 'Women', 'Kids'].map(cat => (
                                    <FilterChip key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '0.25rem' }}>
                                    Price:
                                </span>
                                {PRICE_RANGES.map((r, i) => (
                                    <FilterChip key={i} label={r.label} active={priceRange === i} onClick={() => setPriceRange(i)} />
                                ))}
                            </div>

                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Sort:</span>
                                <select value={sort} onChange={e => setSort(e.target.value)}
                                    style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
                                    <option value="relevant">Relevant</option>
                                    <option value="newest">Newest</option>
                                    <option value="low-high">Price: Low → High</option>
                                    <option value="high-low">Price: High → Low</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* ── Results ──────────────────────────────── */}
                    <div ref={ref} className="container section" style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                                {query
                                    ? <><strong style={{ color: 'var(--text)' }}>{results.length}</strong> results for "<strong style={{ color: 'var(--primary)' }}>{query}</strong>"</>
                                    : <><strong style={{ color: 'var(--text)' }}>{results.length}</strong> products found</>
                                }
                            </p>
                            {(query || category !== 'All' || priceRange !== 0) && (
                                <button onClick={() => { setQuery(''); setCategory('All'); setPriceRange(0); setSort('relevant') }}
                                    style={{ background: 'none', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                                    ✕ Clear all filters
                                </button>
                            )}
                        </div>

                        {results.length > 0 ? (
                            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                {results.map(p => (
                                    <div key={p._id} className="animate-fade-up">
                                        <ProductCard {...p} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                                <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</p>
                                <h3 style={{ marginBottom: '0.5rem' }}>No results found</h3>
                                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                                    Try different keywords or clear your filters
                                </p>
                                <Link to="/collection" className="btn-primary">Browse All Products</Link>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Search