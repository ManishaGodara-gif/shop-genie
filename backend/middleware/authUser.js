import jwt from 'jsonwebtoken'

// Verifies the JWT token sent by the logged-in user
const authUser = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please login again.' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.id
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export default authUser
