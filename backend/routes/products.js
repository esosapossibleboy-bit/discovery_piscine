const express = require('express');
const Product = require('../models/product');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', protect, admin, async (req, res) => {
  const p = await Product.create(req.body);
  res.json(p);
});

router.delete('/:id', protect, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;