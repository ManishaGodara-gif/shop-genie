import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import './Navbar.css'


const Navbar = () => {
    const { token, setToken, setCartItems, getCartCount } = useShop()
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-genie">🧞</span>
                    <span className="logo-text">Shop<em>Genie</em></span>
                </Link>

                <ul className="navbar-links">
                    {[['/', 'Home'], ['/collection', 'Collection'], ['/about', 'About'], ['/contact', 'Contact']].map(([path, label]) => (
                        <li key={path}>
                            <Link to={path} className="nav-link underline-link">{label}</Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar-icons">
                    {/* Search → goes to /search page */}
                    <button className="icon-btn" onClick={() => navigate('/search')} title="Search">🔍</button>

                    <div className="icon-dropdown">
                        <button className="icon-btn" title="Account">👤</button>
                        <div className="dropdown-menu">
                            {token ? (
                                <>
                                    <Link to="/orders">My Orders</Link>
                                    <button onClick={logout}>Logout</button>
                                </>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </div>
                    </div>

                    <Link to="/cart" className="icon-btn cart-icon" title="Cart">
                        🛒
                        {getCartCount() > 0 && (
                            <span className="cart-badge">{getCartCount()}</span>
                        )}
                    </Link>

                    <button className="icon-btn hamburger" onClick={() => setMenuOpen(m => !m)}>☰</button>
                </div>
            </div>

            {menuOpen && (
                <div className="mobile-menu">
                    {[['/', 'Home'], ['/collection', 'Collection'], ['/search', 'Search'], ['/about', 'About'], ['/contact', 'Contact']].map(([path, label]) => (
                        <Link key={path} to={path} onClick={() => setMenuOpen(false)}>{label}</Link>
                    ))}
                    {token
                        ? <button onClick={() => { logout(); setMenuOpen(false) }}>Logout</button>
                        : <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                    }
                </div>
            )}
        </nav>
    )
}

export default Navbar
