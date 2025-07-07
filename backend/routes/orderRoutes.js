const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middleware/verifyToken'); // ✅ Protect routes

// ➕ Place a new order
router.post('/place', verifyToken, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || !total) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const order = new Order({
      user: req.user.userId, // ✅ Automatically use user from token
      items,
      total
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📄 Get all orders (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// 👤 Get logged-in user's own orders ✅
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user orders' });
  }
});

module.exports = router;
