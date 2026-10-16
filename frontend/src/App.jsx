import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext.jsx'
import { useAuth } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

// HOME PAGE - Your Store
function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart, count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://e-commerce-gv5f.onrender.com/api/products')
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{padding: '40px', fontFamily: 'sans-serif', background: '#f9f9f9', minHeight: '100vh'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{fontSize: '32px', fontWeight: 'bold'}}>EsosaTech Store 🔥</h1>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <button onClick={()=>navigate('/cart')} style={{background: 'black', color: 'white', padding: '10px 20px', borderRadius: '8px'}}>🛒 Cart ({count})</button>
          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={logout} style={{padding:'8px'}}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{padding:'8px', background:'#eee', borderRadius:'6px', textDecoration:'none', color:'black'}}>Login</Link>
          )}
        </div>
      </div>
      <p style={{color: 'green', fontWeight: 'bold'}}>{loading ? 'Connecting...' : `✅ ${products.length} products LIVE`}</p>
      
      <div style={{marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
        {products.map(p => (
          <div key={p._id} style={{background: 'white', border: '1px solid #ddd', padding: '20px', borderRadius: '12px'}}>
            <div style={{fontSize: '40px'}}>{p.image}</div>
            <h3 style={{fontWeight: 'bold', marginTop: '10px'}}>{p.name}</h3>
            <p style={{color: '#666', fontSize: '14px'}}>{p.description}</p>
            <p style={{color: 'green', fontWeight: 'bold', fontSize: '20px'}}>${p.price}</p>
            <button onClick={() => addToCart(p)} style={{marginTop: '10px', width: '100%', background: 'black', color: 'white', padding: '8px', borderRadius: '6px', border:'none', cursor:'pointer'}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// CART PAGE - Protected!
function CartPage() {
  const { cart, count, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div style={{padding:'40px'}}>
      <h1>🛒 Your Cart ({count} items)</h1>
      <Link to="/">← Back to Shop</Link>
      {cart.length === 0 ? <p style={{marginTop:'20px'}}>Cart empty! Go add iPhone!</p> : (
        <div style={{marginTop:'20px'}}>
          {cart.map(item => (
            <div key={item._id} style={{display:'flex', justifyContent:'space-between', padding:'10px', borderBottom:'1px solid #ddd'}}>
              <span>{item.image} {item.name} x{item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <h2 style={{marginTop:'20px'}}>Total: ${total}</h2>
          <button style={{marginTop:'10px', padding:'10px 20px', background:'green', color:'white', border:'none', borderRadius:'6px'}}>Checkout ${total} 🔒</button>
          <button onClick={clearCart} style={{marginLeft:'10px', padding:'10px 20px'}}>Clear Cart</button>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
    </Routes>
  )
}