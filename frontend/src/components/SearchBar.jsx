import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useShop()
    const { pathname } = useLocation()
    const inputRef = useRef()

    useEffect(() => {
        if (showSearch && inputRef.current) inputRef.current.focus()
    }, [showSearch])

    if (!showSearch || pathname !== '/collection') return null

    return (
        <div style={{
            background: '#fff', borderBottom: '1px solid var(--border)',
            padding: '0.75rem 1.5rem', display: 'flex',
            alignItems: 'center', gap: '0.75rem', maxWidth: '600px',
            margin: '0 auto'
        }}>
            <span>🔍</span>
            <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.95rem', background: 'transparent' }}
            />
            {search && (
                <button onClick={() => setSearch('')}
                    style={{ background: 'none', fontSize: '1.1rem', color: 'var(--text-light)' }}>
                    ✕
                </button>
            )}
        </div>
    )
}

export default SearchBar
