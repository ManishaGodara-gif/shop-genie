import reviewModel  from '../models/reviewModel.js'
import userModel    from '../models/userModel.js'
import orderModel   from '../models/orderModel.js'

// ─── Add Review ───────────────────────────────────────────────
const addReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body

        // Only allow review if user has actually ordered this product
        const orders = await orderModel.find({ userId })
        const hasBought = orders.some(order =>
            order.items.some(item => item._id?.toString() === productId)
        )
        // (For college project we allow all logged-in users to review)

        // Prevent duplicate review
        const existing = await reviewModel.findOne({ userId, productId })
        if (existing) {
            return res.json({ success: false, message: 'You have already reviewed this product' })
        }

        const user = await userModel.findById(userId)
        if (!user) return res.json({ success: false, message: 'User not found' })

        const review = new reviewModel({
            productId,
            userId,
            userName: user.name,
            rating:   Number(rating),
            comment,
            date:     Date.now()
        })

        await review.save()
        res.json({ success: true, message: 'Review added successfully!' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── Get Reviews for a Product ────────────────────────────────
const getReviews = async (req, res) => {
    try {
        const { productId } = req.body
        const reviews = await reviewModel.find({ productId }).sort({ date: -1 })

        // Calculate average rating
        const avgRating = reviews.length
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0

        res.json({ success: true, reviews, avgRating, total: reviews.length })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { addReview, getReviews }
