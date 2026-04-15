import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const ProductCard = ({ _id, name, price, image }) => {
    const { currency } = useShop()

    return (
        <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: '#fff', borderRadius: 'var(--radius-lg)',
                overflow: 'hidden', border: '1px solid var(--border)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer'
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                }}
            >
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg)' }}>
                    <img
                        src={image[0]}
                        alt={name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                </div>
                <div style={{ padding: '1rem' }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.3rem' }}>
                        {name}
                    </p>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                        {currency}{price.toLocaleString()}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
