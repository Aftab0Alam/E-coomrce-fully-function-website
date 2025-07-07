const express = require('express');
const multer = require('multer');
const verifyToken = require('../middleware/auth');
const { updateProfile } = require('../controllers/authController');

const router = express.Router();

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // uploads folder must exist
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

// ✅ Optional: Add file filter (to restrict to images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// 🔐 PUT /api/users/profile — Update profile (with name, email, and profileImage)
router.put('/profile', verifyToken, upload.single('profileImage'), updateProfile);

module.exports = router;
