import useScrollReveal from '../hooks/useScrollReveal'

const STEPS = [
    { key: 'Order Placed',       icon: '📋', label: 'Order Placed',     desc: 'We received your order'     },
    { key: 'Packing',            icon: '📦', label: 'Packing',          desc: 'Preparing your items'       },
    { key: 'Shipped',            icon: '🚚', label: 'Shipped',          desc: 'On its way to you'          },
    { key: 'Out for Delivery',   icon: '🏍️', label: 'Out for Delivery', desc: 'Almost there!'             },
    { key: 'Delivered',          icon: '✅', label: 'Delivered',        desc: 'Enjoy your purchase!'      },
]

const OrderTimeline = ({ status }) => {
    const { ref, visible } = useScrollReveal()
    const currentIndex = STEPS.findIndex(s => s.key === status)

    return (
        <div ref={ref} style={{
            margin: '1rem 0',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                {STEPS.map((step, i) => {
                    const done    = i <= currentIndex
                    const current = i === currentIndex

                    return (
                        <div key={step.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            {/* Connector line */}
                            {i < STEPS.length - 1 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '50%',
                                    width: '100%',
                                    height: '3px',
                                    background: i < currentIndex ? 'var(--accent)' : '#e2e8f0',
                                    transition: 'background 0.5s ease',
                                    zIndex: 0
                                }} />
                            )}

                            {/* Step circle */}
                            <div style={{
                                width: '42px', height: '42px',
                                borderRadius: '50%',
                                background: done ? (current ? 'var(--accent)' : 'var(--primary)') : '#e2e8f0',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: done ? '1.1rem' : '0.9rem',
                                zIndex: 1, position: 'relative',
                                transition: 'background 0.4s ease, transform 0.3s ease',
                                transform: current ? 'scale(1.2)' : 'scale(1)',
                                boxShadow: current ? '0 0 0 4px rgba(201,149,42,0.25)' : 'none',
                                animation: current ? 'pulse 2s ease-in-out infinite' : 'none'
                            }}>
                                {done ? step.icon : <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c0cad8' }} />}
                            </div>

                            {/* Label */}
                            <p style={{
                                marginTop: '0.5rem',
                                fontSize: '0.72rem',
                                fontWeight: current ? 700 : done ? 500 : 400,
                                color: current ? 'var(--accent)' : done ? 'var(--primary)' : 'var(--text-light)',
                                textAlign: 'center', lineHeight: 1.3,
                                transition: 'color 0.3s'
                            }}>
                                {step.label}
                            </p>
                            {current && (
                                <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.2rem', lineHeight: 1.3 }}>
                                    {step.desc}
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OrderTimeline
