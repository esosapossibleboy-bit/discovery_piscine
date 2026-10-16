import { useEffect, useState } from 'react'
export default function MyOrders() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('https://e-commerce-gv5f.onrender.com/api/orders/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json()).then(setOrders)
  }, [])
  return (
    <div style={{ padding: '40px' }}>
      <h1>My Orders</h1>
      {orders.map(o => (
        <div key={o._id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
          <p><b>{o._id}</b> - ${o.totalAmount} - {o.status}</p>
          <p>{o.items?.map(i => i.name).join(', ')}</p>
        </div>
      ))}
    </div>
  )
}