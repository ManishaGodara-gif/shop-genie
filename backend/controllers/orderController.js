import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

const DELIVERY_CHARGE = 10

// ─── Place Order (Cash on Delivery) ───────────────────────────
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,      // COD = pay on delivery, not yet paid
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        // Clear user's cart after placing order
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order placed successfully!' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── Get All Orders (Admin) ───────────────────────────────────
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── Get User's Orders ────────────────────────────────────────
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── Update Order Status (Admin) ──────────────────────────────
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Order status updated' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, allOrders, userOrders, updateStatus }
