import { useEffect, useState } from 'react';
import api from '../api.js';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => api.get('/orders/my').then(res => setOrders(res.data)).catch(()=>setOrders([]));
  useEffect(() => { load(); }, []);

  const clearOrders = async () => {
    if (!confirm('Clear all your orders?')) return;
    await api.delete('/orders/my/clear');
    load();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>My Orders</h2>
        <button onClick={clearOrders} style={{ background: 'black', color: 'white', padding: '8px 12px', borderRadius: '6px' }}>Clear All Orders</button>
      </div>
      {orders.length === 0 && <p>No orders yet</p>}
      {orders.map(o => (
        <div key={o._id} style={{ border: '1px solid #eee', padding: '10px', marginTop: '10px' }}>
          <p>Order: {o._id} - Total: ${o.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}