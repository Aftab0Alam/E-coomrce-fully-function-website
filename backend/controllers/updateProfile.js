// controllers/updateProfile.js
const User = require('../models/User'); // ✅ Don't forget to import the User model

exports.updateProfile = async (req, res) => {
  try {
    // 1. Check if token middleware passed user info
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const userId = req.user.userId;
    const { name, email } = req.body;

    // 2. Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required' });
    }

    // 3. Prepare update object
    const updateData = { name, email };

    if (req.file) {
      updateData.profileImage = req.file.filename; // uploaded image name
    }

    // 4. Update user in DB
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 5. Send updated user data back
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      profileImage: updatedUser.profileImage || null,
    });

  } catch (err) {
    // 6. Handle errors clearly
    console.error('❌ Profile update error:', err.message);
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};
