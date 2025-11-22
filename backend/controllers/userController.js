const User = require("../models/User");

// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    // req.user is attached by auth middleware
    res.json({ success: true, user: req.user });
  } catch (err) {
    console.error("getMe:", err.message);
    res.status(500).json({ success:false, message: err.message });
  }
};

// GET /api/auth/users  (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    console.error("getAllUsers:", err.message);
    res.status(500).json({ success:false, message: err.message });
  }
};
