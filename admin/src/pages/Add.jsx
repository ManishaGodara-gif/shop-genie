import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ token, backendUrl }) => {
    const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null })
    const [form, setForm] = useState({
        name: '', description: '', price: '', category: 'Men',
        subCategory: 'Topwear', bestseller: false, sizes: []
    })

    const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    const toggleSize = size =>
        setForm(p => ({
            ...p,
            sizes: p.sizes.includes(size) ? p.sizes.filter(s => s !== size) : [...p.sizes, size]
        }))

    const handleSubmit = async () => {
        if (!form.name || !form.price) { toast.error('Name and price are required'); return }
        if (form.sizes.length === 0)   { toast.error('Select at least one size'); return }

        const fd = new FormData()
        Object.entries(form).forEach(([k, v]) =>
            fd.append(k, Array.isArray(v) ? JSON.stringify(v) : String(v))
        )
        Object.entries(images).forEach(([k, v]) => { if (v) fd.append(k, v) })

        try {
            const { data } = await axios.post(`${backendUrl}/api/product/add`, fd, {
                headers: { token }
            })
            if (data.success) {
                toast.success('Product added! 🎉')
                setForm({ name: '', description: '', price: '', category: 'Men', subCategory: 'Topwear', bestseller: false, sizes: [] })
                setImages({ image1: null, image2: null, image3: null, image4: null })
            } else toast.error(data.message)
        } catch (err) { toast.error(err.message) }
    }

    const card = { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }
    const label = { display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }

    return (
        <div style={{ maxWidth: '720px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#1a2b4a', marginBottom: '1.5rem' }}>Add New Product</h2>

            {/* Image Upload */}
            <div style={card}>
                <p style={label}>Product Images (up to 4)</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {Object.keys(images).map(key => (
                        <label key={key} style={{
                            width: '100px', height: '120px', border: '2px dashed #e2e8f0',
                            borderRadius: '8px', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            overflow: 'hidden', background: '#f8fafc', transition: 'border-color 0.2s'
                        }}>
                            {images[key]
                                ? <img src={URL.createObjectURL(images[key])} alt=""
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                : <><span style={{ fontSize: '1.5rem' }}>📷</span>
                                   <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.3rem' }}>Upload</span></>
                            }
                            <input type="file" accept="image/*" hidden
                                onChange={e => setImages(p => ({ ...p, [key]: e.target.files[0] }))} />
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div style={card}>
                <div style={{ marginBottom: '1rem' }}>
                    <p style={label}>Product Name *</p>
                    <input placeholder="e.g. Classic White Linen Shirt"
                        value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <p style={label}>Description</p>
                    <textarea placeholder="Describe the product — fabric, fit, features..."
                        rows={4} value={form.description}
                        onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        style={{ resize: 'vertical' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                        <p style={label}>Category</p>
                        <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                            {['Men', 'Women', 'Kids'].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <p style={label}>Sub Category</p>
                        <select value={form.subCategory} onChange={e => setForm(p => ({ ...p, subCategory: e.target.value }))}>
                            {['Topwear', 'Bottomwear', 'Winterwear'].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <p style={label}>Price (₹) *</p>
                        <input type="number" placeholder="999" min="0"
                            value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div style={card}>
                <p style={label}>Available Sizes *</p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {SIZES.map(size => (
                        <button key={size} onClick={() => toggleSize(size)} style={{
                            padding: '0.45rem 1rem', borderRadius: '6px',
                            border: `1.5px solid ${form.sizes.includes(size) ? '#1a2b4a' : '#e2e8f0'}`,
                            background: form.sizes.includes(size) ? '#1a2b4a' : '#fff',
                            color: form.sizes.includes(size) ? '#fff' : '#334155',
                            fontWeight: 500, fontSize: '0.85rem', transition: 'all 0.15s'
                        }}>{size}</button>
                    ))}
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.bestseller}
                        onChange={e => setForm(p => ({ ...p, bestseller: e.target.checked }))}
                        style={{ width: 'auto', accentColor: '#c9952a' }} />
                    <span style={{ fontSize: '0.875rem', color: '#475569' }}>Mark as Bestseller ⭐</span>
                </label>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} style={{
                background: '#1a2b4a', color: '#fff', padding: '0.9rem 2.5rem',
                borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600,
                transition: 'background 0.2s', width: '100%'
            }}>
                ➕ Add Product
            </button>
        </div>
    )
}

export default Add
