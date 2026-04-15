import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useShop } from '../context/ShopContext'
import StarRating from './StarRating'
import useScrollReveal from '../hooks/useScrollReveal'

const ProductReviews = ({ productId }) => {
    const { backendUrl, token } = useShop()
    const { ref, visible } = useScrollReveal()

    const [reviews,    setReviews]    = useState([])
    const [avgRating,  setAvgRating]  = useState(0)
    const [total,      setTotal]      = useState(0)
    const [showForm,   setShowForm]   = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({ rating: 0, comment: '' })

    const fetchReviews = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/review/get`, { productId })
            if (data.success) {
                setReviews(data.reviews)
                setAvgRating(data.avgRating)
                setTotal(data.total)
            }
        } catch (err) { console.error(err) }
    }

    useEffect(() => { if (productId) fetchReviews() }, [productId])

    const handleSubmit = async () => {
        if (!token)          { toast.error('Please login to review'); return }
        if (!form.rating)    { toast.error('Please select a star rating'); return }
        if (!form.comment.trim()) { toast.error('Please write a comment'); return }

        setSubmitting(true)
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/review/add`,
                { productId, ...form },
                { headers: { token } }
            )
            if (data.success) {
                toast.success('Review submitted! ⭐')
                setForm({ rating: 0, comment: '' })
                setShowForm(false)
                fetchReviews()
            } else toast.error(data.message)
        } catch (err) { toast.error(err.message) }
        finally { setSubmitting(false) }
    }

    // Rating bar percentages
    const ratingCounts = [5,4,3,2,1].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star).length,
        pct:   total ? Math.round((reviews.filter(r => r.rating === star).length / total) * 100) : 0
    }))

    return (
        <section ref={ref} style={{
            marginTop: '4rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>Customer Reviews</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <StarRating value={Math.round(avgRating)} size="1.4rem" />
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)' }}>
                            {avgRating}
                        </span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>({total} review{total !== 1 ? 's' : ''})</span>
                    </div>
                </div>
                <button onClick={() => setShowForm(f => !f)} className="btn-primary"
                    style={{ padding: '0.7rem 1.5rem' }}>
                    {showForm ? 'Cancel' : '✍️ Write a Review'}
                </button>
            </div>

            {/* Rating Bars */}
            {total > 0 && (
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem', maxWidth: '420px' }}>
                    {ratingCounts.map(({ star, count, pct }) => (
                        <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', width: '28px' }}>{star}★</span>
                            <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%', background: 'var(--accent)',
                                    borderRadius: '4px',
                                    width: `${pct}%`,
                                    transition: 'width 1s ease'
                                }} />
                            </div>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', width: '28px' }}>{count}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Write Review Form */}
            {showForm && (
                <div style={{
                    background: '#fff', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)', padding: '1.75rem',
                    marginBottom: '2rem',
                    animation: 'fadeUp 0.35s ease both'
                }}>
                    <h4 style={{ marginBottom: '1.25rem' }}>Share Your Experience</h4>
                    <div style={{ marginBottom: '1rem' }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Your Rating *
                        </p>
                        <StarRating value={form.rating} onChange={r => setForm(p => ({ ...p, rating: r }))} interactive size="2rem" />
                    </div>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Your Review *
                        </p>
                        <textarea
                            rows={4} value={form.comment}
                            onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
                            placeholder="What did you think about this product? Quality, fit, delivery?"
                            style={{ resize: 'vertical', fontFamily: 'var(--font-body)' }}
                        />
                    </div>
                    <button onClick={handleSubmit} className="btn-accent" disabled={submitting}
                        style={{ padding: '0.75rem 2rem', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? <><span className="spinner" style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />Submitting...</> : 'Submit Review ⭐'}
                    </button>
                </div>
            )}

            {/* Review Cards */}
            {reviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💬</p>
                    <p>No reviews yet. Be the first to review this product!</p>
                </div>
            ) : (
                <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {reviews.map((review, i) => (
                        <div key={review._id} className="animate-fade-up hover-lift" style={{
                            background: '#fff', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-lg)', padding: '1.5rem',
                            animationDelay: `${i * 0.08}s`
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontWeight: 700, fontSize: '1rem',
                                        flexShrink: 0
                                    }}>
                                        {review.userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{review.userName}</p>
                                        <StarRating value={review.rating} size="0.95rem" />
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                                    {new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text)', lineHeight: 1.7, fontSize: '0.9rem' }}>{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ProductReviews
