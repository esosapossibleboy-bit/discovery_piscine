import { useEffect, useState } from 'react';
import api from '../api.js';
import { useCart } from '../context/CartContext.jsx';

export default function Store() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>✅ {products.length} products with real images</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '10px', background: 'white' }}>
            <img
              src={p.image}
              alt={p.name}
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'}
            />
            <h4 style={{ margin: '10px 0 5px' }}>{p.name}</h4>
            <p style={{ fontSize: '12px', color: '#666' }}>{p.description}</p>
            <p style={{ fontWeight: 'bold' }}>${p.price}</p>
            <button
              onClick={() => addToCart(p)}
              style={{ width: '100%', background: 'black', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}