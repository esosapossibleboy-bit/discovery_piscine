require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: "iPhone 15 Pro", price: 999, description: "Apple flagship", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500", stock: 10 },
  { name: "MacBook Air M2", price: 1199, description: "Apple laptop", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500", stock: 5 },
  { name: "Sony Headphones", price: 349, description: "Noise cancelling", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500", stock: 15 },
  { name: "Apple Watch", price: 399, description: "Smartwatch", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500", stock: 20 },
  { name: "PS5", price: 499, description: "Gaming console", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500", stock: 8 },
];

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected");
  
  // Safer: don't use deleteMany, just insert
  for (let p of products){
    await Product.create(p);
    console.log("Added:", p.name);
  }
  console.log("✅ DONE - All products with images added!");
  process.exit();
}
seed();