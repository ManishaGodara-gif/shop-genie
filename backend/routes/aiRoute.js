import express from 'express'
import { askShopGenie } from '../controllers/aiController.js'

const aiRouter = express.Router()
aiRouter.post('/ask', askShopGenie)

export default aiRouter