import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { toast } from 'react-toastify'

import Navbar    from './components/Navbar'
import Sidebar   from './components/Sidebar'
import Add       from './pages/Add'
import List      from './pages/List'
import Orders    from './pages/Orders'
import Messages from "./pages/Messages";

const backendUrl = import.meta.env.VITE_BACKEND_URL

// ── Admin Login Screen ────────────────────────────────────────
const LoginPage = ({ setToken }) => {
    const [email,    setEmail]    = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/admin`, { email, password })
            if (data.success) { setToken(data.token); toast.success('Welcome, Admin! 🧞') }
            else toast.error(data.message)
        } catch (err) { toast.error(err.message) }
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: '#f0f4f8'
        }}>
            <div style={{
                background: '#fff', padding: '2.5rem', borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.12)', width: '100%', maxWidth: '380px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2.5rem' }}>🧞</div>
                    <h2 style={{ fontFamily: 'DM Sans, sans-serif', marginTop: '0.5rem', color: '#1a2b4a' }}>Admin Login</h2>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Shop Genie Admin Panel</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input placeholder="Admin Email" type="email"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Password" type="password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                    <button onClick={handleLogin} style={{
                        background: '#1a2b4a', color: '#fff', padding: '0.9rem',
                        border: 'none', borderRadius: '6px', fontSize: '0.95rem',
                        fontFamily: 'DM Sans, sans-serif', cursor: 'pointer'
                    }}>
                        Login →
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Main App ──────────────────────────────────────────────────
const App = () => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '')

    const handleSetToken = (t) => {
        setToken(t)
        localStorage.setItem('adminToken', t)
    }

    if (!token) return (
        <>
            <ToastContainer />
            <LoginPage setToken={handleSetToken} />
        </>
    )

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <ToastContainer />
            <Navbar token={token} setToken={setToken} />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <main style={{ flex: 1, padding: '2rem', maxWidth: '1100px' }}>
                    <Routes>
                        <Route path="/"       element={<Navigate to="/add" />} />
                        <Route path="/add"    element={<Add    token={token} backendUrl={backendUrl} />} />
                        <Route path="/list"   element={<List   token={token} backendUrl={backendUrl} />} />
                        <Route path="/orders" element={<Orders token={token} backendUrl={backendUrl} />} />
                        <Route path="/messages" element={<Messages token={token} />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default App
