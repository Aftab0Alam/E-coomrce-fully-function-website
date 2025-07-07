const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const verifyAdmin = require('../middleware/verifyAdmin'); // ✅ Add this line

// 🔐 GET /api/admin/summary (Admin Only)
router.get('/summary', verifyAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.json({ totalProducts, totalUsers, totalOrders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
});

module.exports = router;
