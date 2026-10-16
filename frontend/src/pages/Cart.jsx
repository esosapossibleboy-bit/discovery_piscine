import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const navigate = useNavigate()
  const [cart] = useState(()=>JSON.parse(localStorage.getItem('cart')||'[]'))
  const total = cart.reduce((s,i)=>s+i.price,0)

  const checkout = async () => {
    const token = localStorage.getItem('token')
    if(!token) return navigate('/login')
    const res = await fetch('https://e-commerce-gv5f.onrender.com/api/orders',{
      method:'POST',
      headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
      body:JSON.stringify({ 
        items: cart.map(i=>({ name:i.name, price:i.price, quantity:1, productId:i._id, image:i.image })), 
        totalAmount: total, 
        shippingAddress:'Emstek, Germany' 
      })
    })
    const data = await res.json()
    if(res.ok){ 
      alert('✅ Order '+data.order._id.slice(-6)+' Created! Paid $'+total)
      localStorage.removeItem('cart')
      navigate('/my-orders')
    } else alert(data.error)
  }

  return (
    <div style={{ padding:'30px' }}>
      <h1>Your Cart ({cart.length}) - ${total}</h1>
      {cart.map((c,i)=><div key={i} style={{ display:'flex', gap:'10px', alignItems:'center', margin:'10px 0' }}><img src={c.image} style={{ width:'50px', height:'50px', objectFit:'cover', borderRadius:'6px' }} /><span>{c.name} - ${c.price}</span></div>)}
      {cart.length>0 ? (
        <div style={{ marginTop:'20px', display:'flex', gap:'10px' }}>
          <button onClick={()=>navigate('/')} style={{ padding:'10px 20px', borderRadius:'8px' }}>Continue Shopping</button>
          <button onClick={checkout} style={{ background:'#22c55e', color:'white', padding:'12px 24px', borderRadius:'8px', fontWeight:'bold', cursor:'pointer' }}>✅ Checkout - Pay ${total}</button>
        </div>
      ) : <p>Cart empty — <a href="/">Go Shopping</a></p>}
    </div>
  )
}