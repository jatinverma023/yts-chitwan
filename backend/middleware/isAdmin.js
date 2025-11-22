const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust path if different

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.cookies?.token;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // token payload may contain userId or userID depending on your auth implementation
    const userId = decoded.userId || decoded.id || decoded._id || decoded.userID;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

    const user = await User.findById(userId).select('+role'); // ensure role is present
    if (!user) return res.status(401).json({ success: false, message: 'Invalid token' });
    if (user.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin only' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Admin auth error:', err);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};
