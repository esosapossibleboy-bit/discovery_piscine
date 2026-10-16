const express = require('express');
const router = express.Router();

// TEST ROUTE - no auth needed to start server
router.get('/test', (req, res) => {
  res.json({ msg: 'Admin route works! 🔥' });
});

// USERS - temporary without auth check
router.get('/users', async (req, res) => {
  try {
    let User;
    try { User = require('../models/user'); } catch { User = require('../models/User'); }
    const users = await User.find().select('-password');
    res.json(users);
  } catch(e){ res.status(500).json({error: e.message}) }
});

module.exports = router;