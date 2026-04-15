import express from 'express'
import { addReview, getReviews } from '../controllers/reviewController.js'
import authUser from '../middleware/authUser.js'

const reviewRouter = express.Router()

reviewRouter.post('/add', authUser, addReview)   // protected — must be logged in
reviewRouter.post('/get', getReviews)             // public

export default reviewRouter
