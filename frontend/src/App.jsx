import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider, useCart } from './context/CartContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Store from './pages/Store'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import ProtectedRoute from './components/ProtectedRoute'

function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
      <Link to="/" style={{ fontSize: '22px', fontWeight: 'bold', textDecoration: 'none', color: 'black' }}>
        EsosaTech Store 🔥
      </Link>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '13px' }}>{user.email}</span>
            <Link to="/admin" style={{ background: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>Admin</Link>
            <button onClick={() => navigate('/my-orders')} style={{ padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>My Orders</button>
            <button onClick={logout} style={{ padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ padding: '6px 12px' }}>Login</Link>
            <Link to="/register" style={{ padding: '6px 12px' }}>Register</Link>
          </>
        )}
        <Link to="/cart" style={{ background: 'black', color: 'white', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none' }}>
          🛒 Cart ({cart.length})
        </Link>
      </div>
    </div>
  )
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}