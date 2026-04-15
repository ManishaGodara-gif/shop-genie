import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useShop } from '../context/ShopContext'
import OrderTimeline from '../components/OrderTimeline'

const Orders = () => {
    const { backendUrl, token, currency } = useShop()
    const [orders, setOrders] = useState([])
    const [expanded, setExpanded] = useState(null)

    const loadOrders = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
            if (data.success) setOrders(data.orders.reverse())
        } catch (err) { toast.error(err.message) }
    }

    useEffect(() => { if (token) loadOrders() }, [token])

    if (!token) return (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
            <p style={{ color: 'var(--text-light)' }}>Please login to view your orders.</p>
        </div>
    )

    return (
        <div className="container section page-enter">
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>My Orders</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '0.9rem' }}>Track all your orders in real time</p>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</p>
                    <p style={{ color: 'var(--text-light)' }}>No orders yet.</p>
                </div>
            ) : (
                <div className="stagger">
                    {orders.map((order, index) => (
                        <div key={order._id} className="animate-fade-up hover-lift"
                            style={{
                                background: '#fff', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-lg)', marginBottom: '1.25rem',
                                overflow: 'hidden', animationDelay: index * 0.07 + 's'
                            }}>
                            {/* Order Header */}
                            <div
                                onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                                style={{
                                    padding: '1.25rem 1.5rem',
                                    display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', cursor: 'pointer',
                                    flexWrap: 'wrap', gap: '0.75rem',
                                    borderBottom: expanded === order._id ? '1px solid var(--border)' : 'none'
                                }}>
                                {/* Left */}
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    {order.items.slice(0, 3).map((item, i) => (
                                        <img key={i} src={item.image?.[0]} alt={item.name}
                                            style={{ width: '52px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                                    ))}
                                    {order.items.length > 3 && (
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>+{order.items.length - 3} more</span>
                                    )}
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                        </p>
                                        <p style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                                            {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>#{order._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
                                        {currency}{order.amount.toLocaleString()}
                                    </span>
                                    <span style={{ fontSize: '1rem', color: 'var(--text-light)', transition: 'transform 0.2s', transform: expanded === order._id ? 'rotate(180deg)' : 'rotate(0)' }}>
                                        ▾
                                    </span>
                                </div>
                            </div>

                            {/* Expanded: Timeline + Items */}
                            {expanded === order._id && (
                                <div style={{ padding: '1.5rem', animation: 'fadeUp 0.3s ease both' }}>
                                    {/* Timeline */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <p style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '1rem' }}>
                                            Order Status
                                        </p>
                                        <OrderTimeline status={order.status} />
                                    </div>

                                    {/* Items */}
                                    <p style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '1rem' }}>
                                        Items in this Order
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {order.items.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                                                <img src={item.image?.[0]} alt={item.name}
                                                    style={{ width: '56px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--border)', flexShrink: 0 }} />
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.name}</p>
                                                    <p style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                                                        Size: <strong>{item.size}</strong> · Qty: <strong>{item.quantity}</strong> · {currency}{item.price?.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Delivery Address */}
                                    <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--bg)', borderRadius: 'var(--radius)', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                                        <strong style={{ color: 'var(--text)' }}>Deliver to: </strong>
                                        {order.address.firstName} {order.address.lastName}, {order.address.street}, {order.address.city}, {order.address.state} — {order.address.zipcode}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders
