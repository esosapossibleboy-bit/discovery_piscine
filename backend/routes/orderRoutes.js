const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    const order = await Order.create({
      user: req.user._id,
      email: req.user.email,
      items,
      totalAmount,
      shippingAddress,
      status: 'Paid'
    });
    res.status(201).json({ message: 'Order created', order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/my', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get('/', auth, async (req, res) => {
  if (req.user.role!== 'admin') return res.status(403).json({ error: 'Admin only' });
  const orders = await Order.find().populate('user', 'email').sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;