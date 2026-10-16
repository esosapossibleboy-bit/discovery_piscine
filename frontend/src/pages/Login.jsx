import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://e-commerce-gv5f.onrender.com/api/auth/login', {email,password});
      login(res.data.user, res.data.token);
      navigate('/');
    } catch(err){ alert(err.response?.data?.msg || 'Login failed'); }
  };

  return (
    <div style={{padding:'40px', maxWidth:'400px', margin:'0 auto'}}>
      <h2>Login to Checkout</h2>
      <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'10px', marginTop:'20px'}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:'10px'}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{padding:'10px'}} />
        <button style={{padding:'10px', background:'black', color:'white'}}>Login</button>
      </form>
      <p style={{marginTop:'15px'}}>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}