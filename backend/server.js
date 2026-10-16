const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// DEBUG log - so you see in Render logs what's missing
console.log('🔍 Checking ENV...');
console.log('MONGO_URI exists?', !!process.env.MONGO_URI);
console.log('JWT_SECRET exists?', !!process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT || 10000);

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('✅ EsosaTech Backend is LIVE - ' + new Date());
});

// Don't crash if MONGO_URI missing - show error
if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is NOT SET in Render Environment Variables!');
  console.error('Go to Render > Environment > Add MONGO_URI');
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err.message));
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});