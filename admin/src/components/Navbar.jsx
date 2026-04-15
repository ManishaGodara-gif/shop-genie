const Navbar = ({ setToken }) => (
    <nav style={{
        background: '#1a2b4a', color: '#fff', padding: '0 1.5rem',
        height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🧞</span>
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>ShopGenie <em style={{ color: '#c9952a', fontStyle: 'normal', fontSize: '0.8rem' }}>Admin</em></span>
        </div>
        <button onClick={() => { localStorage.removeItem('adminToken'); window.location.reload() }}
            style={{
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                padding: '0.4rem 1rem', borderRadius: '5px', fontSize: '0.8rem',
                border: '1px solid rgba(255,255,255,0.2)', transition: 'background 0.2s'
            }}>
            Logout
        </button>
    </nav>
)

export default Navbar
