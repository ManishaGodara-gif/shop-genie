import { Link } from 'react-router-dom'

const Footer = () => (
    <footer style={{
        background: 'var(--primary)', color: '#fff',
        padding: '3rem 0 1.5rem'
    }}>
        <div className="container" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem', marginBottom: '2rem'
        }}>
            <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
                    🧞 Shop<em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Genie</em>
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7 }}>
                    Your wish, our mission. Discover curated fashion delivered to your door.
                </p>
            </div>
            <div>
                <h4 style={{ marginBottom: '1rem', letterSpacing: '0.1em', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)' }}>Quick Links</h4>
                {[['/', 'Home'], ['/collection', 'Collection'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([path, label]) => (
                    <Link key={path} to={path} style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = '#fff'}
                        onMouseLeave={e => e.target.style.color = '#94a3b8'}
                    >{label}</Link>
                ))}
            </div>
            <div>
                <h4 style={{ marginBottom: '1rem', letterSpacing: '0.1em', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)' }}>Contact</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.8 }}>
                    support@shopgenie.com<br />
                    +91 93063 19633<br />
                    Mon–Sat, 9 AM – 6 PM
                </p>
            </div>
        </div>
        <div className="container" style={{ borderTop: '1px solid #ffffff1a', paddingTop: '1rem', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
                © {new Date().getFullYear()} ShopGenie. All rights reserved. Made with ✨ for college project.
            </p>
        </div>
    </footer>
)

export default Footer
