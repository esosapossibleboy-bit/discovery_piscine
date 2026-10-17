const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('✅ Starting...');
console.log('MONGO_URI exists?', !!process.env.MONGO_URI);

app.get('/', (req,res)=> res.send('✅ EsosaTech Backend LIVE'));

// Use YOUR real file names from screenshot
try {
  const productRoutes = require('./routes/products');
  app.use('/api/products', productRoutes);
  console.log('✅ products.js loaded');
} catch(e){ console.log('❌ products.js failed:', e.message); }

try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ auth.js loaded');
} catch(e){ console.log('❌ auth.js failed:', e.message); }

try {
  // You have orderRoutes.js not orders.js
  const orderRoutes = require('./routes/orderRoutes');
  app.use('/api/orders', orderRoutes);
  console.log('✅ orderRoutes.js loaded');
} catch(e){ 
  console.log('❌ orderRoutes.js failed:', e.message);
  // try alternative name
  try {
    app.use('/api/orders', require('./routes/orders'));
  } catch{}
}

if(process.env.MONGO_URI){
  mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('✅ MongoDB Connected'))
    .catch(err=> console.log('❌ Mongo error:', err.message));
} else {
  console.log('❌ MONGO_URI missing - add to .env and Render Environment');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`🚀 Server running on ${PORT}`));