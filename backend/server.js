/*import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import reviewRouter  from './routes/reviewRoute.js'
import aiRouter from './routes/aiRoute.js'
import searchRouter from "./routes/searchRoute.js";



// ─── App Config ───────────────────────────────────────────────
const app = express()
const port = process.env.PORT || 4000



// with your other app.use lines:



connectDB()
connectCloudinary()

// ─── Middlewares ──────────────────────────────────────────────
app.use(cors())
app.use(express.json())
app.use('/api/ai', aiRouter)


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));


// ─── API Endpoints ────────────────────────────────────────────
// with your other app.use lines:
app.use("/api/search", searchRouter);
app.use('/api/user',    userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart',    cartRouter)
app.use('/api/order',   orderRouter)
app.use('/api/review',  reviewRouter)


app.get('/', (req, res) => {
    res.send('🧞 Shop Genie API is running!')
})

app.listen(port, () => console.log(`✅ Server running on port ${port}`))*/
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import aiRouter from './routes/aiRoute.js'
import contactRouter from "./routes/contactRoute.js";

// ─── App Config ───────────────────────────────────────────────
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// ─── Middlewares ──────────────────────────────────────────────
app.use(express.json())
app.use(cors())

// ─── API Endpoints ────────────────────────────────────────────
app.use('/api/user',    userRouter)
app.use("/api/contact", contactRouter)
app.use('/api/product', productRouter)
app.use('/api/cart',    cartRouter)
app.use('/api/order',   orderRouter)
app.use('/api/review',  reviewRouter)
app.use('/api/ai',      aiRouter)

app.get('/', (req, res) => {
    res.send('🧞 Shop Genie API is running!')
})

app.listen(port, () => console.log(`✅ Server running on port ${port}`))
