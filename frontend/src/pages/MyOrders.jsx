import { useEffect, useState } from 'react'

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem('token')
  const API = 'https://e-commerce-gv5f.onrender.com/api'

  const load = () => {
    fetch(`${API}/orders/my`, { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(setOrders)
  }
  useEffect(load, [])

  const clearOrder = async (id) => {
    if(!confirm('Clear this order from your history?')) return
    await fetch(`${API}/orders/${id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` } })
    load()
  }

  const clearAll = async () => {
    if(!confirm('Clear ALL your orders?')) return
    for(const o of orders){ await fetch(`${API}/orders/${o._id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` } }) }
    load()
  }

  return (
    <div style={{ padding:'30px', maxWidth:'800px', margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <h1>My Orders ({orders.length})</h1>
        {orders.length>0 && <button onClick={clearAll} style={{ background:'#ef4444', color:'white', padding:'10px 16px', borderRadius:'8px', border:'none', height:'fit-content' }}>🗑 Clear All My Orders</button>}
      </div>
      {orders.map(o=>(
        <div key={o._id} style={{ border:'1px solid #ccc', padding:'15px', margin:'12px 0', borderRadius:'10px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <p><b>{o._id.slice(-6)}</b> — ${o.totalAmount} — <b style={{ color:o.status==='Shipped'?'green':'orange' }}>{o.status}</b> {o.status==='Shipped'?'📦':''}</p>
            <p style={{ margin:'5px 0' }}>{o.items?.map(i=>i.name).join(', ')}</p>
            <small>{new Date(o.createdAt).toLocaleString()} — {o.shippingAddress}</small>
          </div>
          <button onClick={()=>clearOrder(o._id)} style={{ background:'#333', color:'white', padding:'8px 14px', borderRadius:'8px', border:'none', cursor:'pointer' }}>Clear</button>
        </div>
      ))}
      {orders.length===0 && <p>No orders — <a href="/">Go shop</a></p>}
      <br/><a href="/">← Back to Store</a> | <a href="/admin"> Admin</a>
    </div>
  )
}