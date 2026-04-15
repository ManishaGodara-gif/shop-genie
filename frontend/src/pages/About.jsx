export const About = () => (
    <div>
        {/* Hero */}
        <section style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #253d6b 100%)',
            color: '#fff', padding: '4rem 0', textAlign: 'center'
        }}>
            <div className="container">
                <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>About Shop Genie</h1>
                <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
                    Born from a passion for fashion and a love of technology — we're here to make your shopping wishes come true.
                </p>
            </div>
        </section>

        {/* Story */}
        <section className="section">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div>
                    <p className="tag" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>✦ Our Story</p>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>Your Wish,<br />Our Mission</h2>
                    <div className="divider" />
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.9, marginBottom: '1rem', marginTop: '1rem' }}>
                        Shop Genie was built as a college final-year project to explore modern full-stack web development using the MERN stack — MongoDB, Express, React, and Node.js.
                    </p>
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.9 }}>
                        It features a complete e-commerce flow: product listings, cart management, user authentication, admin dashboard, and Cash on Delivery checkout — all deployed live on the web.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[['🛍️', 'Curated Products', 'Handpicked styles for every taste'],
                      ['🔒', 'Secure Auth',    'JWT-based user authentication'],
                      ['🚀', 'Fast & Modern',  'React + Vite for blazing speed'],
                      ['📦', 'Live Deployed',  'Hosted on Render & Vercel']
                    ].map(([icon, title, desc]) => (
                        <div key={title} style={{
                            background: '#fff', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{icon}</div>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{title}</h4>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Tech Stack */}
        <section className="section" style={{ background: 'var(--bg)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tech Stack</h2>
                <div className="divider" style={{ margin: '0.75rem auto 2.5rem' }} />
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    {['React + Vite', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT Auth', 'Cloudinary', 'Render', 'Vercel'].map(tech => (
                        <span key={tech} style={{
                            padding: '0.5rem 1.25rem', background: '#fff',
                            border: '1px solid var(--border)', borderRadius: '20px',
                            fontSize: '0.875rem', fontWeight: 500, color: 'var(--primary)'
                        }}>{tech}</span>
                    ))}
                </div>
            </div>
        </section>
    </div>
)

export const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Message sent! We will get back to you soon. 🧞')
    }

    return (
        <div>
            <section style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #253d6b 100%)',
                color: '#fff', padding: '4rem 0', textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Get in Touch</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '440px', margin: '0 auto' }}>
                        Questions, feedback, or just want to say hello? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '900px', margin: '0 auto' }}>
                    {/* Contact Info */}
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Contact Info</h2>
                        {[['📧', 'Email',   'support@shopgenie.com'],
                          ['📞', 'Phone',   '+91 98765 43210'],
                          ['📍', 'Address', 'Mumbai, Maharashtra, India'],
                          ['🕐', 'Hours',   'Mon–Sat, 9 AM – 6 PM']
                        ].map(([icon, label, value]) => (
                            <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem' }}>{label}</p>
                                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Send a Message</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input placeholder="Your Name" required />
                            <input type="email" placeholder="Email Address" required />
                            <input placeholder="Subject" />
                            <textarea placeholder="Your message..." rows={5}
                                style={{ resize: 'vertical', fontFamily: 'var(--font-body)' }} />
                            <button type="submit" className="btn-primary" style={{ padding: '0.9rem' }}>
                                Send Message ✉️
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
