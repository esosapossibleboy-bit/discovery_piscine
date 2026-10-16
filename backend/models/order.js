const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: String,
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Paid' },
  shippingAddress: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);