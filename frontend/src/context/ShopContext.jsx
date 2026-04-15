import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const currency      = '₹'
    const deliveryFee   = 50
    const backendUrl    = import.meta.env.VITE_BACKEND_URL

    const [search,     setSearch]     = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [products,   setProducts]   = useState([])
    const [cartItems,  setCartItems]  = useState({})
    const [token,      setToken]      = useState(localStorage.getItem('token') || '')

    // ─── Fetch all products ─────────────────────────────────
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/list`)
            if (data.success) setProducts(data.products)
            else toast.error(data.message)
        } catch (err) {
            toast.error(err.message)
        }
    }

    // ─── Add item to cart ───────────────────────────────────
    const addToCart = async (itemId, size) => {
        if (!size) { toast.warning('Please select a size'); return }

        let cart = structuredClone(cartItems)
        cart[itemId] = cart[itemId] || {}
        cart[itemId][size] = (cart[itemId][size] || 0) + 1
        setCartItems(cart)

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`,
                    { itemId, size },
                    { headers: { token } }
                )
            } catch (err) { toast.error(err.message) }
        }
    }

    // ─── Update quantity in cart ────────────────────────────
    const updateQuantity = async (itemId, size, quantity) => {
        let cart = structuredClone(cartItems)
        cart[itemId][size] = quantity
        setCartItems(cart)

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { token } }
                )
            } catch (err) { toast.error(err.message) }
        }
    }

    // ─── Get total cart count ───────────────────────────────
    const getCartCount = () => {
        return Object.values(cartItems)
            .flatMap(sizes => Object.values(sizes))
            .reduce((sum, qty) => sum + qty, 0)
    }

    // ─── Get total cart amount ──────────────────────────────
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [id, sizes]) => {
            const product = products.find(p => p._id === id)
            if (!product) return total
            return total + Object.entries(sizes).reduce((sum, [, qty]) => sum + product.price * qty, 0)
        }, 0)
    }

    // ─── Load user cart from backend ────────────────────────
    const loadUserCart = async (userToken) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/cart/get`, {}, {
                headers: { token: userToken }
            })
            if (data.success) setCartItems(data.cartData)
        } catch (err) { toast.error(err.message) }
    }

    useEffect(() => { fetchProducts() }, [])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            loadUserCart(token)
        }
    }, [token])

    const value = {
        currency, deliveryFee, backendUrl,
        search, setSearch, showSearch, setShowSearch,
        products, cartItems, setCartItems,
        token, setToken,
        addToCart, updateQuantity,
        getCartCount, getCartAmount
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export const useShop = () => useContext(ShopContext)
export default ShopContextProvider
