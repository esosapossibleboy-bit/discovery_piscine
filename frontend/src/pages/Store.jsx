import { useEffect, useState } from 'react'

export default function Store() {
  const [products, setProducts] = useState([])
  useEffect(()=>{ fetch('https://e-commerce-gv5f.onrender.com/api/products').then(r=>r.json()).then(setProducts) }, [])

  const addToCart = (p) => {
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    cart.push(p)
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(p.name+' added to cart!')
  }

  return (
    <div style={{ padding:'20px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1>EsosaTech Store 🔥</h1>
        <a href="/cart" style={{ background:'black', color:'white', padding:'10px 16px', borderRadius:'8px', textDecoration:'none' }}>🛒 Cart ({JSON.parse(localStorage.getItem('cart')||'[]').length})</a>
      </div>
      <p>✅ {products.length} products with real images</p>
      <div style={{ display:'flex', gap:'20px', flexWrap:'wrap', marginTop:'20px' }}>
        {products.map(p=>(
          <div key={p._id} style={{ border:'1px solid #ddd', borderRadius:'12px', width:'230px', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src={p.image} alt={p.name} style={{ width:'100%', height:'170px', objectFit:'cover' }} />
            <div style={{ padding:'12px' }}>
              <h3 style={{ margin:'0 0 5px 0' }}>{p.name}</h3>
              <p style={{ fontSize:'13px', color:'#666', margin:'0 0 5px 0' }}>{p.description}</p>
              <b style={{ fontSize:'18px' }}>${p.price}</b>
              <button onClick={()=>addToCart(p)} style={{ background:'black', color:'white', width:'100%', padding:'10px', borderRadius:'8px', marginTop:'10px', cursor:'pointer' }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <br/><div style={{ display:'flex', gap:'10px' }}><a href="/my-orders">My Orders</a> | <a href="/admin">Admin Panel</a></div>
    </div>
  )
}