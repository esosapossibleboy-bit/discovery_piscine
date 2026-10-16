import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from './context/CartContext'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCart, setShowCart] = useState(false)
  
  const { cart, addToCart, removeFromCart, total, count } = useCart()

  useEffect(() => {
    axios.get('https://e-commerce-gv5f.onrender.com/api/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log('Backend not running!', err)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{padding: '40px', fontFamily: 'sans-serif', background: '#f9f9f9', minHeight: '100vh'}}>
      
      {/* HEADER WITH CART COUNT */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{fontSize: '40px', fontWeight: 'bold'}}>EsosaTech Store 🔥</h1>
        <button 
          onClick={() => setShowCart(!showCart)}
          style={{background: 'black', color: 'white', padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}
        >
          🛒 Cart ({count})
        </button>
      </div>

      <p style={{color: 'green', fontWeight: 'bold'}}>
        {loading ? 'Connecting...' : `✅ Connected! ${products.length} products from LIVE backend`}
      </p>

      {/* CART VIEW */}
      {showCart && (
        <div style={{marginTop: '20px', background: 'white', padding: '20px', borderRadius: '12px', border: '2px solid black'}}>
          <h2>Your Cart - ${total}</h2>
          {cart.length === 0 ? <p>Cart is empty</p> : (
            cart.map(item => (
              <div key={item._id} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee'}}>
                <span>{item.image} {item.name} x{item.qty}</span>
                <span>${item.price * item.qty} <button onClick={() => removeFromCart(item._id)} style={{marginLeft: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer'}}>Remove</button></span>
              </div>
            ))
          )}
          <button onClick={() => setShowCart(false)} style={{marginTop: '15px', padding: '8px 15px'}}>Close Cart</button>
        </div>
      )}
      
      {/* PRODUCTS GRID */}
      <div style={{marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
        {products.map(p => (
          <div key={p._id} style={{background: 'white', border: '1px solid #ddd', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '40px'}}>{p.image}</div>
            <h3 style={{fontWeight: 'bold', marginTop: '10px'}}>{p.name}</h3>
            <p style={{color: '#666', fontSize: '14px'}}>{p.description}</p>
            <p style={{color: 'green', fontWeight: 'bold', fontSize: '20px', marginTop: '10px'}}>${p.price}</p>
            <button 
              onClick={() => addToCart(p)}
              style={{marginTop: '10px', width: '100%', background: 'black', color: 'white', padding: '8px', borderRadius: '6px', border: 'none', cursor: 'pointer'}}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 
export default App