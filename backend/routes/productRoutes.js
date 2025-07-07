const express = require('express');
const Product = require('../models/Product');
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const verifyToken = require('../middleware/auth');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

// 🔒 Admin: Add new product
router.post('/add', verifyToken, verifyAdmin, addProduct);

// 🌍 Public: Get all products with filters and sorting
router.get('/all', async (req, res) => {
  const { search, category, minPrice, maxPrice, sort } = req.query;

  const filter = {};

  // 🔍 Text Search
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  // 📂 Category Filter
  if (category) {
    filter.category = category;
  }

  // 💰 Price Range Filter
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  // ↕️ Sorting
  let sortOption = {};
  if (sort === 'asc') sortOption.price = 1;
  if (sort === 'desc') sortOption.price = -1;

  try {
    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (err) {
    console.error('❌ Product fetch error:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// 🔄 Admin: Update product by ID
router.put('/:id', verifyToken, verifyAdmin, updateProduct);

// ❌ Admin: Delete product by ID
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
