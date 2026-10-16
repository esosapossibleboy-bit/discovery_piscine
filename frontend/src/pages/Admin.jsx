import { useEffect, useState } from 'react'

export default function Admin() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', stock: 10 })
  const token = localStorage.getItem('token')
  const API = 'https://e-commerce-gv5f.onrender.com/api'

  const load = async () => {
    const p = await fetch(`${API}/products`).then(r=>r.json())
    setProducts(p)
    const o = await fetch(`${API}/orders`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.json()).catch(()=>[])
    if(Array.isArray(o)) setOrders(o)
  }
  useEffect(()=>{ load() }, [])

  const addProduct = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, price: Number(form.price) })
    })
    if(res.ok){ setForm({ name:'', price:'', description:'', image:'', stock:10 }); load(); alert('✅ Added!') }
  }

  const deleteProduct = async (id) => {
    if(!confirm('Delete this product permanently?')) return
    await fetch(`${API}/products/${id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` } })
    load()
  }

  const markShipped = async (id) => {
    await fetch(`${API}/orders/${id}/ship`, { method:'PUT', headers:{ Authorization:`Bearer ${token}` } })
    load()
  }

  const deleteOrder = async (id) => {
    if(!confirm('Clear this order?')) return
    await fetch(`${API}/orders/${id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` } })
    load()
  }

  return (
    <div style={{ padding:'20px', maxWidth:'1200px', margin:'0 auto' }}>
      <h1>Admin Panel 🔧</h1>
      <div style={{ border:'2px solid black', padding:'20px', borderRadius:'12px', background:'#f9f9f9' }}>
        <h2>Add Product + Real Image URL</h2>
        <form onSubmit={addProduct} style={{ display:'grid', gap:'10px', maxWidth:'500px' }}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required style={{ padding:'10px' }} />
          <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required style={{ padding:'10px' }} />
          <input placeholder="Image URL https://..." value={form.image} onChange={e=>setForm({...form,image:e.target.value})} required style={{ padding:'10px' }} />
          <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{ padding:'10px' }} />
          <button style={{ background:'black', color:'white', padding:'12px', borderRadius:'8px' }}>+ Add Product</button>
        </form>
      </div>

      <h2>Products ({products.length}) - Admin can DELETE</h2>
      <div style={{ display:'flex', gap:'15px', flexWrap:'wrap' }}>
        {products.map(p=>(
          <div key={p._id} style={{ border:'1px solid #ddd', width:'190px', borderRadius:'12px', overflow:'hidden' }}>
            <img src={p.image} alt={p.name} style={{ width:'100%', height:'130px', objectFit:'cover' }} onError={e=>e.target.src='https://via.placeholder.com/190x130'} />
            <div style={{ padding:'10px' }}>
              <b>{p.name}</b><br/>${p.price}
              <br/><button onClick={()=>deleteProduct(p._id)} style={{ background:'#ef4444', color:'white', border:'none', padding:'6px 12px', borderRadius:'6px', marginTop:'8px', cursor:'pointer' }}>🗑 Delete Product</button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop:'40px' }}>All Orders ({orders.length})</h2>
      {orders.map(o=>(
        <div key={o._id} style={{ border:'1px solid #ccc', padding:'12px', margin:'8px 0', borderRadius:'8px', display:'flex', justifyContent:'space-between' }}>
          <div><b>{o._id.slice(-6)}</b> - {o.email} - ${o.totalAmount} - <b style={{ color:o.status==='Shipped'?'green':'orange' }}>{o.status}</b><br/><small>{o.items?.map(i=>i.name).join(', ')}</small></div>
          <div style={{ display:'flex', gap:'8px' }}>
            {o.status!=='Shipped' && <button onClick={()=>markShipped(o._id)} style={{ background:'#22c55e', color:'white', padding:'8px', borderRadius:'6px', border:'none' }}>Shipped</button>}
            <button onClick={()=>deleteOrder(o._id)} style={{ background:'#666', color:'white', padding:'8px', borderRadius:'6px', border:'none' }}>Clear</button>
          </div>
        </div>
      ))}
    </div>
  )
}