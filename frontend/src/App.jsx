import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'

// Simple pages for now
function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">EsosaTech Store</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/products" className="hover:text-gray-300">Products</Link>
          <Link to="/cart" className="hover:text-gray-300">Cart</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center p-20 bg-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to EsosaTech</h1>
        <p className="text-xl text-gray-600 mb-8">Best tech deals in Germany</p>
        <Link to="/products" className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800">
          Shop Now
        </Link>
      </div>

      {/* Test Tailwind */}
      <h1 className="text-3xl font-bold text-red-500 p-10 text-center">Tailwind V4 Works! ✅</h1>
    </div>
  )
}

function Products() {
  return <div className="p-10"><h2 className="text-2xl font-bold">Products coming soon...</h2></div>
}

function Cart() {
  return <div className="p-10"><h2 className="text-2xl font-bold">Your Cart is empty</h2></div>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App