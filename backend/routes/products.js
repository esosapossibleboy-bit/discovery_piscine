const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET all products - public (for Store)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add product - admin (requires login token)
router.post('/', auth, async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price required' });
    }

    const product = new Product({
      name,
      price: Number(price),
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      stock: stock || 10
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product - admin (this is what you asked for)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product (bonus - for editing price/image)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price: Number(price), description, image, stock },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;