import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import useScrollReveal from '../hooks/useScrollReveal'

const RevealSection = ({ children, delay = 0 }) => {
    const { ref, visible } = useScrollReveal()
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(36px)',
            transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`
        }}>
            {children}
        </div>
    )
}

const Home = () => {
    const { products } = useShop()
    const bestsellers = products.filter(p => p.bestseller).slice(0, 4)
    const latest = [...products].sort((a, b) => b.date - a.date).slice(0, 8)

    return (
        <div>
            {/* ── Hero ──────────────────────────────────────── */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #253d6b 100%)',
                color: '#fff', padding: '6rem 0', textAlign: 'center',
                position: 'relative', overflow: 'hidden', minHeight: '520px',
                display: 'flex', alignItems: 'center'
            }}>
                {/* Decorative animated circles */}
                <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(201,149,42,0.1)', animation: 'float 6s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', animation: 'float 8s ease-in-out infinite reverse' }} />
                <div style={{ position: 'absolute', top: '30%', left: '8%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(201,149,42,0.07)', animation: 'float 5s ease-in-out infinite' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <p className="animate-fade-up" style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: '1.25rem', animationDelay: '0.1s' }}>
                        ✦ Your Wish, Our Mission ✦
                    </p>
                    <h1 className="animate-fade-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: 'var(--font-display)', marginBottom: '1.5rem', lineHeight: 1.1, animationDelay: '0.2s' }}>
                        Discover Fashion<br />
                        <em style={{ color: 'var(--accent-light)', fontStyle: 'normal' }}>Like Never Before</em>
                    </h1>
                    <p className="animate-fade-up" style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.8, animationDelay: '0.3s' }}>
                        Handpicked collections that match your unique style. Free delivery on orders above ₹999.
                    </p>
                    <div className="animate-fade-up" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.4s' }}>
                        <Link to="/collection" className="btn-accent" style={{ padding: '0.9rem 2.5rem', fontSize: '0.95rem' }}>
                            Shop Collection →
                        </Link>
                        <Link to="/search" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff', padding: '0.9rem 2.5rem' }}>
                            🔍 Search Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Stats ──────────────────────────────────────── */}
            <section style={{ background: 'var(--accent)', color: '#fff', padding: '1.25rem 0' }}>
                <div className="container stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: '1rem' }}>
                    {[['500+', 'Products'], ['10K+', 'Happy Customers'], ['Free', 'Easy Returns']].map(([num, label]) => (
                        <div key={label} className="animate-fade-up">
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700 }}>{num}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.85, letterSpacing: '0.05em' }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Bestsellers ──────────────────────────────────── */}
            {bestsellers.length > 0 && (
                <section className="section">
                    <div className="container">
                        <RevealSection>
                            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                <h2 style={{ fontSize: '2.2rem' }}>Bestsellers</h2>
                                <div className="divider" style={{ margin: '0.75rem auto' }} />
                                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Our most loved pieces</p>
                            </div>
                        </RevealSection>
                        <RevealSection delay={0.1}>
                            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.5rem' }}>
                                {bestsellers.map(p => (
                                    <div key={p._id} className="animate-fade-up">
                                        <ProductCard {...p} />
                                    </div>
                                ))}
                            </div>
                        </RevealSection>
                    </div>
                </section>
            )}

            {/* ── Latest Arrivals ────────────────────────────── */}
            <section className="section" style={{ background: 'var(--bg)' }}>
                <div className="container">
                    <RevealSection>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.2rem' }}>Latest Arrivals</h2>
                            <div className="divider" style={{ margin: '0.75rem auto' }} />
                            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Fresh styles, just landed</p>
                        </div>
                    </RevealSection>
                    <RevealSection delay={0.1}>
                        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.5rem' }}>
                            {latest.map(p => (
                                <div key={p._id} className="animate-fade-up">
                                    <ProductCard {...p} />
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                            <Link to="/collection" className="btn-outline">View All Products</Link>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* ── Features ──────────────────────────────────── */}
            <section className="section">
                <div className="container">
                    <RevealSection>
                        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                            {[['🚚', 'Free Delivery', 'On orders above ₹999'],
                              ['↩️', 'Easy Returns', '7-day hassle-free returns'],
                              ['🔒', 'Secure Auth', 'JWT protected accounts'],
                              ['💬', '24/7 Support', 'We are here to help']
                            ].map(([icon, title, desc]) => (
                                <div key={title} className="animate-fade-up hover-lift" style={{ padding: '2rem', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', animation: 'float 3s ease-in-out infinite' }}>{icon}</div>
                                    <h4 style={{ marginBottom: '0.4rem' }}>{title}</h4>
                                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{desc}</p>
                                </div>
                            ))}
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* ── CTA Banner ────────────────────────────────── */}
            <section style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #b8821f 100%)', padding: '4rem 0', textAlign: 'center', color: '#fff' }}>
                <RevealSection>
                    <div className="container">
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                            Ready to Find Your Style? ✨
                        </h2>
                        <p style={{ opacity: 0.9, marginBottom: '2rem', fontSize: '1rem' }}>
                            Use our smart search to find exactly what you're looking for
                        </p>
                        <Link to="/search" style={{
                            display: 'inline-block', background: '#fff', color: 'var(--accent)',
                            padding: '0.9rem 2.5rem', borderRadius: 'var(--radius)',
                            fontWeight: 700, fontSize: '0.95rem',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            fontFamily: 'var(--font-body)'
                        }}
                            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)' }}
                            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none' }}
                        >
                            🔍 Start Searching
                        </Link>
                    </div>
                </RevealSection>
            </section>
        </div>
    )
}

export default Home
