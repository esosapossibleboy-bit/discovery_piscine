require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS - Allow Vercel + localhost
app.use(cors({
  origin: '*', // for now allow all, later restrict to your Vercel URL
  credentials: true
}));
app.use(express.json());

// Routes - PHASE 5 COMPLETE
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/admin', require('./routes/admin')); // 👑 Admin Power
app.use('/api/orders', require('./routes/orderRoutes')); // 🛒 NEW - Phase 5 Orders!

app.get('/', (req, res) => res.send('EsosaTech REAL API 🔥 Phase 5 - Auth + Admin + Orders'));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB Connected');

    // Seed products if empty
    try {
      const Product = require('./models/product');
      Product.countDocuments().then(count => {
        if (count === 0) {
          Product.insertMany([
            { name: 'iPhone 15 Pro', price: 999, category: 'Phone', image: '📱', description: 'Latest iPhone' },
            { name: 'MacBook Pro M3', price: 1999, category: 'Laptop', image: '💻', description: 'Powerful laptop' },
            { name: 'AirPods Pro', price: 249, category: 'Audio', image: '🎧', description: 'Noise cancelling' },
          ]).then(() => console.log('🌱 Seeded 3 products'));
        } else {
          console.log(`📦 ${count} products already in DB`);
        }
      });
    } catch(e) {
      console.log('⚠️ Product model not found, skipping seed');
    }

    app.listen(PORT, () => console.log(`✅ REAL Backend on port ${PORT} + Admin + Orders ready`));
  })
.catch(err => console.log('❌ Mongo Error:', err.message));