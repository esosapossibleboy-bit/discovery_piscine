import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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
      <h1 style={{fontSize: '40px', fontWeight: 'bold'}}>EsosaTech Store 🔥</h1>
      <p style={{color: 'green', fontWeight: 'bold'}}>
        {loading ? 'Connecting...' : `✅ Connected! ${products.length} products from LIVE backend`}
      </p>
      
      <div style={{marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
        {products.map(p => (
          <div key={p._id} style={{background: 'white', border: '1px solid #ddd', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '40px'}}>{p.image}</div>
            <h3 style={{fontWeight: 'bold', marginTop: '10px'}}>{p.name}</h3>
            <p style={{color: '#666', fontSize: '14px'}}>{p.description}</p>
            <p style={{color: 'green', fontWeight: 'bold', fontSize: '20px', marginTop: '10px'}}>${p.price}</p>
            <button style={{marginTop: '10px', width: '100%', background: 'black', color: 'white', padding: '8px', borderRadius: '6px', border: 'none', cursor: 'pointer'}}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {!loading && products.length === 0 && (
        <p style={{color: 'red'}}>Backend not running! Check https://e-commerce-gv5f.onrender.com/api/products</p>
      )}
    </div>
  )
}
export default App