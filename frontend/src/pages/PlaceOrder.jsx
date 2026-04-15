import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useShop } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'

const PlaceOrder = () => {
    const { backendUrl, token, cartItems, setCartItems, getCartAmount, deliveryFee, products } = useShop()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', zipcode: '', country: '', phone: ''
    })

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async () => {
        if (!token) { toast.error('Please login first'); navigate('/login'); return }

        const orderItems = Object.entries(cartItems).flatMap(([id, sizes]) =>
            Object.entries(sizes)
                .filter(([, qty]) => qty > 0)
                .map(([size, quantity]) => {
                    const product = products.find(p => p._id === id)
                    return { ...product, size, quantity }
                })
        )

        if (orderItems.length === 0) { toast.error('Your cart is empty'); return }

        const orderData = {
            address: form,
            items: orderItems,
            amount: getCartAmount() + deliveryFee
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } })
            if (data.success) {
                setCartItems({})
                toast.success('Order placed successfully! 🎉')
                navigate('/orders')
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const fields = [
        [['firstName', 'First Name'], ['lastName', 'Last Name']],
        [['email', 'Email Address']],
        [['street', 'Street Address']],
        [['city', 'City'], ['state', 'State']],
        [['zipcode', 'ZIP / Pincode'], ['country', 'Country']],
        [['phone', 'Phone Number']]
    ]

    return (
        <div className="container section">
            <h1 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>Checkout</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'flex-start' }}>

                {/* Delivery Form */}
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Delivery Information</h3>
                    {fields.map((row, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: row.length === 1 ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            {row.map(([name, label]) => (
                                <input key={name} name={name} placeholder={label}
                                    value={form[name]} onChange={handleChange}
                                    type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'} />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Order Summary + Payment */}
                <div>
                    <CartTotal />
                    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginTop: '1rem' }}>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Payment Method</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: '2px solid var(--primary)', borderRadius: 'var(--radius)', background: 'rgba(26,43,74,0.04)' }}>
                            <span style={{ fontSize: '1.2rem' }}>💵</span>
                            <div>
                                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Cash on Delivery</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Pay when your order arrives</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="btn-primary"
                        style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem' }}>
                        Place Order ✨
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
