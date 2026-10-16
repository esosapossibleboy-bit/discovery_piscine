import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Store() {
  const [products, setProducts] = useState([])
  const { cart, addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://e-commerce-gv5f.onrender.com/api/products')
      .then(r => r.json())
      .then(setProducts)
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>EsosaTech Store 🔥</h1>
      <p>✅ {products.length} / 3 products LIVE</p>
      <button onClick={() => navigate('/cart')}>🛒 Cart ({cart.length})</button>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '12px', width: '200px' }}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => addToCart(p)} style={{ background: 'black', color: 'white', padding: '8px', width: '100%', borderRadius: '8px' }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}