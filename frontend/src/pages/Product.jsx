import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import ProductReview from '../components/ProductReview'
import StarRating from '../components/StarRating'

const Product = () => {
    const { id } = useParams()
    const { products, currency, addToCart } = useShop()

    const [product,      setProduct]      = useState(null)
    const [mainImage,    setMainImage]    = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [related,      setRelated]      = useState([])
    const [addedAnim,    setAddedAnim]    = useState(false)

    useEffect(() => {
        const found = products.find(p => p._id === id)
        if (found) {
            setProduct(found)
            setMainImage(found.image?.[0] || '')
            setSelectedSize('')
            setRelated(products.filter(p => p.category === found.category && p._id !== id).slice(0, 4))
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [id, products])

    const handleAddToCart = () => {
        addToCart(product._id, selectedSize)
        if (selectedSize) {
            setAddedAnim(true)
            setTimeout(() => setAddedAnim(false), 1200)
        }
    }

    if (!product) return (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
            <p style={{ color: 'var(--text-light)' }}>Loading product...</p>
        </div>
    )


    return (
        <div className="container section page-enter">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>

                {/* Images */}
                <div className="animate-slide-left" style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {product.image.map((img, i) => (
                            <img key={i} src={img} alt={'view ' + i}
                                onClick={() => setMainImage(img)}
                                style={{
                                    width: '72px', height: '88px', objectFit: 'cover',
                                    borderRadius: 'var(--radius)', cursor: 'pointer',
                                    border: mainImage === img ? '2px solid var(--accent)' : '2px solid transparent',
                                    transition: 'border-color 0.2s, transform 0.2s',
                                    transform: mainImage === img ? 'scale(1.05)' : 'scale(1)'
                                }}
                            />
                        ))}
                    </div>
                    <div style={{ flex: 1, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg)', position: 'relative' }}>
                        <img src={mainImage} alt={product.name}
                            style={{ width: '100%', height: '500px', objectFit: 'cover', transition: 'opacity 0.3s ease' }} />
                        {product.bestseller && (
                            <div style={{
                                position: 'absolute', top: '12px', left: '12px',
                                background: 'var(--accent)', color: '#fff',
                                padding: '0.3rem 0.8rem', borderRadius: '20px',
                                fontSize: '0.75rem', fontWeight: 600,
                                animation: 'pulse 2s ease-in-out infinite'
                            }}>
                                Bestseller
                            </div>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="animate-slide-right">
                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                        {product.category} · {product.subCategory}
                    </p>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', lineHeight: 1.2 }}>{product.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        <StarRating value={4} size="1.1rem" />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>See reviews below</span>
                    </div>
                    <p style={{ fontSize: '2.2rem', color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1.5rem' }}>
                        {currency}{product.price.toLocaleString()}
                    </p>
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
                        {product.description}
                    </p>
                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Select Size
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {product.sizes.map(size => (
                                <button key={size} onClick={() => setSelectedSize(size)}
                                    style={{
                                        padding: '0.5rem 1rem', borderRadius: 'var(--radius)',
                                        border: '1.5px solid ' + (selectedSize === size ? 'var(--primary)' : 'var(--border)'),
                                        background: selectedSize === size ? 'var(--primary)' : '#fff',
                                        color: selectedSize === size ? '#fff' : 'var(--text)',
                                        fontSize: '0.875rem', fontWeight: 500,
                                        cursor: 'pointer',
                                        transition: 'all 0.18s ease',
                                        transform: selectedSize === size ? 'scale(1.08)' : 'scale(1)',
                                        fontFamily: 'var(--font-body)'
                                    }}>
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleAddToCart}
                        style={{
                            width: '100%', padding: '1rem', fontSize: '1rem',
                            background: addedAnim ? '#16a34a' : 'var(--primary)',
                            color: '#fff', border: 'none', borderRadius: 'var(--radius)',
                            cursor: 'pointer', fontFamily: 'var(--font-body)',
                            fontWeight: 500, letterSpacing: '0.04em',
                            transition: 'background 0.3s, transform 0.15s',
                            transform: addedAnim ? 'scale(0.97)' : 'scale(1)'
                        }}>
                        {addedAnim ? '✓ Added to Cart!' : 'Add to Cart 🛒'}
                    </button>
                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                        {['100% Original Product', 'Cash On Delivery Available', 'Easy 7-day Return Policy'].map((item, i) => (
                            <p key={i} style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                                ✓ {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <ProductReview productId={id} />

            {related.length > 0 && (
                <section style={{ marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>You May Also Like</h2>
                    <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {related.map(p => <ProductCard key={p._id} {...p} />)}
                    </div>
                </section>
            )}
        </div>
    )
}

export default Product
