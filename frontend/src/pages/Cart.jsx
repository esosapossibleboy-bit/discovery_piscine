import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)

  const checkout = async () => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')
    
    const res = await fetch('https://e-commerce-gv5f.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.qty||1, productId: i._id })),
        totalAmount: total,
        shippingAddress: 'Emstek, Germany'
      })
    })
    const data = await res.json()
    if (res.ok) {
      alert('✅ Order ' + data.order._id + ' created!')
      localStorage.removeItem('cart')
      navigate('/my-orders')
    } else alert(data.error)
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Your Cart ({cart.length}) - ${total}</h1>
      {cart.map((c,i) => <p key={i}>{c.name} x {c.qty||1} = ${c.price}</p>)}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'black', color: 'white', padding: '10px 20px', borderRadius: '8px' }}>Continue Shopping</button>
        <button onClick={checkout} style={{ background: '#22c55e', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>✅ Checkout - Pay ${total}</button>
      </div>
    </div>
  )
}