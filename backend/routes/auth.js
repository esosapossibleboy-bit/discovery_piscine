const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req,res)=>{
  try {
    const {email,password} = req.body;
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({msg:'User exists'});
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({email, password:hashed});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'esosa_secret');
    res.json({token, user:{email}});
  } catch(err){ res.status(500).json({msg: err.message}) }
});

router.post('/login', async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'User not found'});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg:'Wrong password'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'esosa_secret');
    res.json({token, user:{email}});
  } catch(err){ res.status(500).json({msg: err.message}) }
});

module.exports = router;