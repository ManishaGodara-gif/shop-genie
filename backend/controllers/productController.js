import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

// ─── Add Product ──────────────────────────────────────────────
const addProduct = async (req, res) => {
    try {

        console.log(req.files);
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        // Collect uploaded images (up to 4)
        const imageFiles = ['image1', 'image2', 'image3', 'image4']
            .map(key => req.files[key]?.[0])
            .filter(Boolean)

        // Upload each image to Cloudinary
        const imageUrls = await Promise.all(
            imageFiles.map(file =>
                cloudinary.uploader.upload(file.path, { resource_type: 'image' })
                    .then(result => result.secure_url)
            )
        )

        const product = new productModel({
            name,
            description,
            price:       Number(price),
            category,
            subCategory,
            sizes:       JSON.parse(sizes),
            bestseller:  bestseller === 'true',
            image:       imageUrls,
            date:        Date.now()
        })

        await product.save()
        res.json({ success: true, message: 'Product added successfully' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── List All Products ────────────────────────────────────────
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── Remove Product ───────────────────────────────────────────
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Product removed' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ─── Get Single Product ───────────────────────────────────────
const singleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.productId)
        res.json({ success: true, product })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }
