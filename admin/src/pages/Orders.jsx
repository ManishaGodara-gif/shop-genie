import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const STATUS_OPTIONS = ['Order Placed', 'Packing', 'Shipped', 'Out for Delivery', 'Delivered']
const STATUS_COLORS  = {
    'Order Placed':      '#f59e0b',
    'Packing':           '#3b82f6',
    'Shipped':           '#8b5cf6',
    'Out for Delivery':  '#f97316',
    'Delivered':         '#16a34a'
}

const Orders = ({ token, backendUrl }) => {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } })
            if (data.success) setOrders(data.orders.reverse())
        } catch (err) { toast.error(err.message) }
    }

    const updateStatus = async (orderId, status) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/order/status`,
                { orderId, status }, { headers: { token } })
            if (data.success) { toast.success('Status updated'); fetchOrders() }
        } catch (err) { toast.error(err.message) }
    }

    useEffect(() => { fetchOrders() }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1a2b4a' }}>
                    Orders <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 400 }}>({orders.length})</span>
                </h2>
                <button onClick={fetchOrders} style={{
                    background: '#f1f5f9', border: '1px solid #e2e8f0',
                    padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#475569'
                }}>
                    🔄 Refresh
                </button>
            </div>

            {orders.length === 0 && (
                <p style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>No orders yet.</p>
            )}

            {orders.map(order => (
                <div key={order._id} style={{
                    background: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: '10px', padding: '1.25rem',
                    marginBottom: '1rem',
                    borderLeft: `4px solid ${STATUS_COLORS[order.status] || '#e2e8f0'}`
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        {/* Items */}
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                #{order._id.slice(-8).toUpperCase()} · {new Date(order.date).toLocaleDateString('en-IN')}
                            </p>
                            {order.items.map((item, i) => (
                                <p key={i} style={{ fontSize: '0.875rem', color: '#334155', marginBottom: '0.2rem' }}>
                                    <strong>{item.name}</strong> — Size {item.size} × {item.quantity}
                                </p>
                            ))}
                        </div>

                        {/* Address */}
                        <div style={{ minWidth: '160px' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Ship To</p>
                            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.7 }}>
                                {order.address.firstName} {order.address.lastName}<br />
                                {order.address.city}, {order.address.state}<br />
                                {order.address.phone}
                            </p>
                        </div>

                        {/* Amount + Status */}
                        <div style={{ textAlign: 'right', minWidth: '160px' }}>
                            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a2b4a', marginBottom: '0.75rem' }}>
                                ₹{order.amount.toLocaleString()}
                            </p>
                            <select value={order.status}
                                onChange={e => updateStatus(order._id, e.target.value)}
                                style={{
                                    width: 'auto', padding: '0.4rem 0.75rem',
                                    fontSize: '0.8rem', fontWeight: 500,
                                    color: STATUS_COLORS[order.status] || '#475569',
                                    borderColor: STATUS_COLORS[order.status] || '#e2e8f0'
                                }}>
                                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Orders
