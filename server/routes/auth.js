const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const lowerEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ username, email: lowerEmail, password });
    await newUser.save();

    req.session.userId = newUser._id;
    res.json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt:', email);
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user._id;
    console.log('User logged in:', user.username);
    res.json({ message: 'Logged in', username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Could not log out' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
