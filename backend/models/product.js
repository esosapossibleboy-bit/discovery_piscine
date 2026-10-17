const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  stock: { type: Number, default: 10 }
}, { timestamps: true });

// IMPORTANT: Must export like this, not { Product }
const Product = mongoose.model('Product', productSchema);
module.exports = Product;