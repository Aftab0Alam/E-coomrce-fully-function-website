const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false // ✅ Normal users are not admin
  },
  profileImage: {
    type: String,
    default: '' // ✅ Stores filename (e.g., "profile123.jpg") or full URL
  }
}, { timestamps: true }); // ✅ Automatically adds createdAt & updatedAt

module.exports = mongoose.model("User", userSchema);
