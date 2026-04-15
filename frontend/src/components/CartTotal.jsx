import { useShop } from '../context/ShopContext'

const CartTotal = () => {
    const { currency, deliveryFee, getCartAmount } = useShop()
    const subtotal = getCartAmount()
    const total = subtotal + (subtotal > 0 ? deliveryFee : 0)

    const row = (label, value, bold = false) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-light)', fontWeight: bold ? 600 : 400 }}>{label}</span>
            <span style={{ fontWeight: bold ? 700 : 500, color: bold ? 'var(--primary)' : 'var(--text)' }}>{value}</span>
        </div>
    )

    return (
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Order Summary</h3>
            {row('Subtotal',  `${currency}${subtotal.toLocaleString()}`)}
            {row('Delivery',  subtotal > 0 ? `${currency}${deliveryFee}` : 'FREE')}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />
            {row('Total',     `${currency}${total.toLocaleString()}`, true)}
        </div>
    )
}

export default CartTotal
