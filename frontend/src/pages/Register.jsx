import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://e-commerce-gv5f.onrender.com/api/auth/register', {email,password});
      login(res.data.user, res.data.token);
      navigate('/');
    } catch(err){ alert(err.response?.data?.msg || 'Register failed'); }
  };

  return (
    <div style={{padding:'40px', maxWidth:'400px', margin:'0 auto'}}>
      <h2>Create Account</h2>
      <form onSubmit={handleRegister} style={{display:'flex', flexDirection:'column', gap:'10px', marginTop:'20px'}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:'10px'}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{padding:'10px'}} />
        <button style={{padding:'10px', background:'black', color:'white'}}>Register</button>
      </form>
      <p style={{marginTop:'15px'}}>Have account? <Link to="/login">Login</Link></p>
    </div>
  );
}