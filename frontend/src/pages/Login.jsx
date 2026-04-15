import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useShop } from '../context/ShopContext'

const Login = () => {
    const { backendUrl, setToken } = useShop()
    const navigate = useNavigate()
    const [mode, setMode]   = useState('login')   // 'login' | 'register'
    const [form, setForm]   = useState({ name: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const url = mode === 'login'
                ? `${backendUrl}/api/user/login`
                : `${backendUrl}/api/user/register`

            const payload = mode === 'login'
                ? { email: form.email, password: form.password }
                : { name: form.name, email: form.email, password: form.password }

            const { data } = await axios.post(url, payload)

            if (data.success) {
                setToken(data.token)
                toast.success(mode === 'login' ? 'Welcome back! 👋' : 'Account created! 🎉')
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '80vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: '2rem', background: 'var(--bg)'
        }}>
            <div style={{
                background: '#fff', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '2.5rem',
                width: '100%', maxWidth: '420px',
                boxShadow: 'var(--shadow-lg)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧞</div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                        {mode === 'login' ? 'Sign in to your Shop Genie account' : 'Join Shop Genie today'}
                    </p>
                </div>

                {/* Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {mode === 'register' && (
                        <input name="name" placeholder="Full Name"
                            value={form.name} onChange={handleChange} />
                    )}
                    <input name="email" type="email" placeholder="Email Address"
                        value={form.email} onChange={handleChange} />
                    <input name="password" type="password" placeholder="Password"
                        value={form.password} onChange={handleChange}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()} />

                    <button onClick={handleSubmit} className="btn-primary" disabled={loading}
                        style={{ padding: '0.9rem', fontSize: '0.95rem', opacity: loading ? 0.7 : 1 }}>
                        {loading ? '⏳ Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </div>

                {/* Toggle */}
                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                        style={{ background: 'none', color: 'var(--accent)', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
                        {mode === 'login' ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login
