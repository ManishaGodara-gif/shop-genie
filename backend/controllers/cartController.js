import userModel from '../models/userModel.js'

// ─── Add To Cart ──────────────────────────────────────────────
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body
        const user = await userModel.findById(userId)
        let cartData = user.cartData

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1
        } else {
            cartData[itemId] = { [size]: 1 }
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Added to cart' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── Update Cart ──────────────────────────────────────────────
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body
        const user = await userModel.findById(userId)
        let cartData = user.cartData

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Cart updated' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── Get User Cart ────────────────────────────────────────────
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        res.json({ success: true, cartData: user.cartData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }
