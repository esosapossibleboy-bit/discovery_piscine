import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext.jsx'
import { useAuth } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Admin from './pages/Admin.jsx'

const API = 'https://e-commerce-gv5f.onrender.com'

function Home() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const { addToCart, count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API}/api/products`).then(res => {
      setProducts(res.data)
      setFiltered(res.data)
    })
  }, [])

  useEffect(() => {
    let result = products
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'All') result = result.filter(p => p.category === category)
    setFiltered(result)
  }, [search, category, products])

  return (
    <div style={{padding:'20px 40px', fontFamily:'sans-serif', background:'#fafafa', minHeight:'100vh'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
        <h1 style={{fontSize:'28px', fontWeight:'900'}}>EsosaTech Store 🔥</h1>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <span style={{fontSize:'14px'}}>{user?.email}</span>
          {/* FIXED - ALWAYS SHOW ADMIN BUTTON */}
          <Link to="/admin" style={{padding:'8px 14px', background:'#ef4444', color:'white', borderRadius:'8px', textDecoration:'none', fontWeight:'700'}}>Admin 👑</Link>
          <button onClick={()=>navigate('/cart')} style={{padding:'8px 14px', background:'black', color:'white', borderRadius:'8px', border:'none', cursor:'pointer'}}>🛒 Cart ({count})</button>
          {user ? <button onClick={logout} style={{padding:'6px 10px', border:'1px solid #ddd', borderRadius:'6px', cursor:'pointer'}}>Logout</button> : <Link to="/login" style={{padding:'6px 10px', border:'1px solid #ddd', borderRadius:'6px', textDecoration:'none', color:'black'}}>Login</Link>}
        </div>
      </div>

      <p style={{marginBottom:'15px', fontWeight:'600', color:'green'}}>✅ {filtered.length} / {products.length} products LIVE</p>

      <div style={{display:'flex', gap:'10px', marginBottom:'25px'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search iPhone, MacBook..." style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}} />
        <select value={category} onChange={e=>setCategory(e.target.value)} style={{padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}}>
          <option>All</option><option>Phone</option><option>Laptop</option><option>Audio</option>
        </select>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'20px'}}>
        {filtered.map(p => (
          <div key={p._id} style={{background:'white', border:'1px solid #eee', borderRadius:'16px', padding:'20px'}}>
            <div style={{fontSize:'32px', marginBottom:'10px'}}>{p.category==='Phone'?'📱':p.category==='Laptop'?'💻':'🎧'}</div>
            <h3 style={{fontWeight:'700'}}>{p.name}</h3>
            <p style={{fontSize:'13px', color:'#666'}}>{p.description} • {p.category}</p>
            <p style={{fontSize:'20px', fontWeight:'800', color:'#16a34a', margin:'10px 0'}}>${p.price}</p>
            <button onClick={()=>addToCart(p)} style={{width:'100%', padding:'10px', background:'black', color:'white', borderRadius:'10px', border:'none', cursor:'pointer', fontWeight:'600'}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function CartPage() {
  const { cart, count } = useCart()
  const total = cart.reduce((s,i)=> s + i.price*i.quantity, 0)
  return (
    <div style={{padding:'40px', fontFamily:'sans-serif'}}>
      <h1>Your Cart ({count}) - ${total}</h1>
      {cart.map(item=> <div key={item._id} style={{padding:'10px 0', borderBottom:'1px solid #eee'}}>{item.name} x {item.quantity} = ${item.price*item.quantity}</div>)}
      <div style={{marginTop:'20px', display:'flex', gap:'10px'}}>
        <Link to="/" style={{padding:'10px 20px', background:'black', color:'white', borderRadius:'8px', textDecoration:'none'}}>Continue Shopping</Link>
        <Link to="/admin" style={{padding:'10px 20px', border:'1px solid #ddd', borderRadius:'8px', textDecoration:'none'}}>Go Admin</Link>
      </div>
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
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
    </Routes>
  )
}