import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import SearchBar   from './components/SearchBar'

import Home        from './pages/Home'
import Collection  from './pages/Collection'
import Product     from './pages/Product'
import Cart        from './pages/Cart'
import PlaceOrder  from './pages/PlaceOrder'
import Orders      from './pages/Orders'
import Login       from './pages/Login'
import About       from './pages/About'
import Contact     from './pages/Contact'
import Search      from './pages/Search'

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer position="top-right" autoClose={2500} />
      <Navbar />
      <SearchBar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/collection"  element={<Collection />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart"        element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders"      element={<Orders />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/about"       element={<About />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/search"      element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
