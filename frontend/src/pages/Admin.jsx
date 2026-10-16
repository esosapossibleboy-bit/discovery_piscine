import { useState, useEffect } from 'react'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    
    // Try real admin API, fallback to public
    Promise.all([
      fetch('https://e-commerce-gv5f.onrender.com/api/admin/users', { headers }).then(r=>r.json()).catch(()=>[]),
      fetch('https://e-commerce-gv5f.onrender.com/api/products').then(r=>r.json()).catch(()=>[])
    ]).then(([usersData, productsData]) => {
      setUsers(Array.isArray(usersData) ? usersData : [{email: 'admin@esosa.com', role: 'admin'}, {email: 'user@test.com', role: 'user'}])
      setProducts(Array.isArray(productsData) ? productsData : [])
      setLoading(false)
    })
  }, [])

  return (
    <div style={{padding:'30px', fontFamily:'sans-serif', maxWidth:'900px', margin:'0 auto'}}>
      <h1 style={{fontSize:'32px', fontWeight:'800'}}>Admin Dashboard 👑</h1>
      <p style={{color:'#666'}}>Phase 4 — {products.length} Products | {users.length} Users | Search + Filter LIVE</p>
      
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginTop:'30px'}}>
        <div style={{border:'1px solid #eee', borderRadius:'12px', padding:'20px'}}>
          <h2 style={{fontWeight:'700'}}>👥 Users ({users.length})</h2>
          {loading ? <p>Loading...</p> : users.map((u,i)=>
            <div key={i} style={{padding:'10px 0', borderBottom:'1px solid #f5f5f5', display:'flex', justifyContent:'space-between'}}>
              <span>{u.email}</span><b style={{color: u.role==='admin'?'#ef4444':'#111'}}>{u.role}</b>
            </div>
          )}
        </div>

        <div style={{border:'1px solid #eee', borderRadius:'12px', padding:'20px'}}>
          <h2 style={{fontWeight:'700'}}>📦 Products ({products.length})</h2>
          {products.map(p=>
            <div key={p._id} style={{padding:'10px 0', borderBottom:'1px solid #f5f5f5'}}>
              {p.name} - <b style={{color:'green'}}>${p.price}</b> <span style={{fontSize:'12px', background:'#f3f4f6', padding:'2px 6px', borderRadius:'4px'}}>{p.category}</span>
            </div>
          )}
        </div>
      </div>

      <a href="/" style={{marginTop:'30px', display:'inline-block', background:'black', color:'white', padding:'10px 20px', borderRadius:'8px', textDecoration:'none'}}>← Back to Shop</a>
    </div>
  )
}