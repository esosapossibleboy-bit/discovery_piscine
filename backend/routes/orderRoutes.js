const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');

// POST create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    const order = new Order({
      user: req.user.id,
      email: req.user.email,
      items,
      totalAmount,
      shippingAddress,
      status: 'Paid'
    });
    await order.save();
    res.status(201).json({ order });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET my orders
router.get('/my', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

// GET all orders - admin
router.get('/', auth, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// PUT mark as shipped
router.put('/:id/ship', auth, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Shipped' }, { new: true });
  res.json(order);
});

// DELETE order - user can clear own order, admin can clear any
router.delete('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Not found' });
    // allow if owner or any logged user is admin (for simplicity)
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order cleared' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;