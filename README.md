# 🧞 Shop Genie — MERN E-Commerce App

> **Your Wish, Our Mission** — A full-stack e-commerce web application built with the MERN stack.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue) ![Payment](https://img.shields.io/badge/Payment-Cash%20on%20Delivery-green) ![Deploy](https://img.shields.io/badge/Deploy-Render%20%2B%20Vercel-purple)

---

## 📌 Project Overview

Shop Genie is a complete e-commerce platform with:
- A **user-facing storefront** (browse, cart, checkout)
- An **admin dashboard** (manage products and orders)
- A **REST API backend** (authentication, database, file upload)

Built as a major college project demonstrating full-stack MERN development.

---

## ✨ Features

| Feature | Details |
|---|---|
| User Auth | JWT-based register / login |
| Product Catalog | Filter by category, sub-category, search |
| Cart | Add, update, remove items with size selection |
| Checkout | Cash on Delivery — no payment API needed |
| Order Tracking | Real-time status updates from admin |
| Admin Panel | Add/delete products, manage orders, update status |
| Image Upload | Cloudinary integration via Multer |
| Responsive | Mobile-friendly design throughout |

---

## 🗂️ Project Structure

```
shop-genie/
├── backend/          → Node.js + Express API
│   ├── config/       → DB and Cloudinary setup
│   ├── controllers/  → Business logic
│   ├── middleware/   → Auth guards + file upload
│   ├── models/       → MongoDB schemas
│   ├── routes/       → API endpoints
│   └── server.js     → Entry point
│
├── frontend/         → React (Vite) — User website
│   └── src/
│       ├── components/  → Navbar, Footer, ProductCard, etc.
│       ├── context/     → Global state (ShopContext)
│       └── pages/       → Home, Collection, Cart, Orders...
│
└── admin/            → React (Vite) — Admin dashboard
    └── src/
        ├── components/  → Navbar, Sidebar
        └── pages/       → Add, List, Orders
```

---

## 🚀 Getting Started (Run Locally)

### 1. Clone the project
```bash
git clone https://github.com/yourusername/shop-genie.git
cd shop-genie
```

### 2. Set up Backend
```bash
cd backend
npm install
cp .env.example .env
# → Fill in your MongoDB URI, JWT secret, Cloudinary keys
npm run dev
```

### 3. Set up Frontend
```bash
cd frontend
npm install
cp .env.example .env
# → Set VITE_BACKEND_URL=http://localhost:4000
npm run dev
```

### 4. Set up Admin
```bash
cd admin
npm install
cp .env.example .env
# → Set VITE_BACKEND_URL=http://localhost:4000
npm run dev
```

---

## 🔐 Environment Variables

### backend/.env
```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net
JWT_SECRET=any_random_secret_string
ADMIN_EMAIL=admin@shopgenie.com
ADMIN_PASSWORD=Admin@1234
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
PORT=4000
```

### frontend/.env & admin/.env
```
VITE_BACKEND_URL=http://localhost:4000   ← local
VITE_BACKEND_URL=https://your-app.onrender.com  ← production
```

---

## 🌐 Deployment Guide

### Backend → Render
1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → select `backend/` folder
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `.env`

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import GitHub repo → set **Root Directory** to `frontend`
3. Add env var: `VITE_BACKEND_URL=https://your-backend.onrender.com`
4. Deploy ✅

### Admin → Vercel
- Same steps as frontend but set Root Directory to `admin`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JSON Web Tokens (JWT) + bcrypt |
| Images | Cloudinary + Multer |
| State | React Context API |
| Hosting | Render (backend) + Vercel (frontend + admin) |

---

## 📱 Pages

**Frontend (User):**
- `/` — Home with Hero, Bestsellers, Latest Arrivals
- `/collection` — All products with filters + sort
- `/product/:id` — Product detail + size selector
- `/cart` — Cart management
- `/place-order` — Checkout with delivery form
- `/orders` — User order history
- `/login` — Auth (login/register)
- `/about` — About & tech stack
- `/contact` — Contact form

**Admin:**
- `/add` — Add new product with image upload
- `/list` — All products with delete
- `/orders` — All orders with status update

---

## 👩‍💻 Developer

Built with ❤️ as a college final-year project.

> **Note:** This project uses Cash on Delivery only — no payment gateway API keys required.
