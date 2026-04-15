import { NavLink } from 'react-router-dom'

const links = [
    { to: '/add',    icon: '➕', label: 'Add Product'  },
    { to: '/list',   icon: '📦', label: 'Products List' },
    { to: '/orders', icon: '🛒', label: 'Orders'        },
    { to: '/messages', icon: '✉️', label: 'Messages'       }
]

const Sidebar = () => (
    <aside style={{
        width: '220px', minHeight: 'calc(100vh - 60px)',
        background: '#fff', borderRight: '1px solid #e2e8f0',
        padding: '1.5rem 0', flexShrink: 0
    }}>
        {links.map(({ to, icon, label }) => (
            <NavLink key={to} to={to}
                style={({ isActive }) => ({
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.85rem 1.5rem', fontSize: '0.875rem', fontWeight: 500,
                    color: isActive ? '#1a2b4a' : '#64748b',
                    background: isActive ? 'rgba(26,43,74,0.08)' : 'transparent',
                    borderLeft: isActive ? '3px solid #c9952a' : '3px solid transparent',
                    transition: 'all 0.15s'
                })}>
                <span>{icon}</span>
                {label}
            </NavLink>
        ))}
    </aside>
)

export default Sidebar
