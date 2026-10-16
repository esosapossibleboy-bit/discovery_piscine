const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
  stock: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);