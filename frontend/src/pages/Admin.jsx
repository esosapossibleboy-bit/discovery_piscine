import { useEffect, useState } from 'react';
import api from '../api.js';

export default function Admin() {
  const [products, setProducts] = useState([]);

  const load = () => api.get('/products').then(res => setProducts(res.data));
  useEffect(() => { load(); }, []);

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin - Manage Products</h2>
      {products.map(p => (
        <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '10px' }}>
          <span>{p.name} - ${p.price}</span>
          <button onClick={() => deleteProduct(p._id)} style={{ background: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>Delete</button>
        </div>
      ))}
    </div>
  );
}