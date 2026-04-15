import { useShop } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const { products, cartItems, updateQuantity, currency } = useShop()
    const navigate = useNavigate()

    const cartList = Object.entries(cartItems).flatMap(([id, sizes]) =>
        Object.entries(sizes)
            .filter(([, qty]) => qty > 0)
            .map(([size, qty]) => ({ product: products.find(p => p._id === id), size, qty }))
            .filter(({ product }) => product)
    )

    if (cartList.length === 0) return (
        <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
            <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</p>
            <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
            <Link to="/collection" className="btn-primary">Start Shopping</Link>
        </div>
    )

    return (
        <div className="container section">
            <h1 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>Shopping Cart</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'flex-start' }}>
                <div>
                    {cartList.map(({ product, size, qty }) => (
                        <div key={product._id + size} style={{
                            display: 'flex', gap: '1.25rem', alignItems: 'center',
                            background: '#fff', borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border)', padding: '1rem',
                            marginBottom: '1rem'
                        }}>
                            <img src={product.image[0]} alt={product.name}
                                style={{ width: '90px', height: '110px', objectFit: 'cover', borderRadius: 'var(--radius)', flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ marginBottom: '0.3rem', fontSize: '1rem' }}>{product.name}</h4>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Size: {size}</p>
                                <p style={{ color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                                    {currency}{product.price.toLocaleString()}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button onClick={() => updateQuantity(product._id, size, Math.max(1, qty - 1))}
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border)', background: '#fff', fontFamily: 'var(--font-body)' }}>−</button>
                                <span style={{ width: '24px', textAlign: 'center', fontSize: '0.9rem' }}>{qty}</span>
                                <button onClick={() => updateQuantity(product._id, size, qty + 1)}
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border)', background: '#fff', fontFamily: 'var(--font-body)' }}>+</button>
                            </div>
                            <button onClick={() => updateQuantity(product._id, size, 0)}
                                style={{ background: 'none', color: '#ef4444', fontSize: '1.1rem', padding: '0.25rem' }}>🗑</button>
                        </div>
                    ))}
                </div>
                <div>
                    <CartTotal />
                    <button onClick={() => navigate('/place-order')} className="btn-primary"
                        style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem' }}>
                        Proceed to Checkout →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
