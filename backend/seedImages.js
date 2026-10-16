const mongoose = require('mongoose');
const Product = require('./models/Product');

async function seed() {
  await mongoose.connect('mongodb+srv://esosa_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/esosatech');
  
  await Product.updateOne({ name: /iPhone/i }, { 
    $set: { image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600', description: 'Latest iPhone' } 
  });
  await Product.updateOne({ name: /MacBook/i }, { 
    $set: { image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600', description: 'Powerful laptop' } 
  });
  await Product.updateOne({ name: /AirPods/i }, { 
    $set: { image: 'https://images.unsplash.com/photo-1600294037682-40bad0f5f6f0?w=600', description: 'Noise cancelling' } 
  });

  console.log('✅ Images updated!');
  process.exit();
}
seed();