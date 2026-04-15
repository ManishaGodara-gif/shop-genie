import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import authUser from '../middleware/authUser.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

// Admin
orderRouter.post('/list',   adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// User (authenticated)
orderRouter.post('/place',      authUser, placeOrder)
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter
