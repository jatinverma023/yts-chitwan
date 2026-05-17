const express = require('express');
const router = express.Router();
const { auth, requireAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Event = require('../models/Event');

// List all events including inactive (admin view)
router.get('/events', auth, requireAdmin, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json({ success: true, events });
  } catch (err) {
    console.error('Admin /events error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch events' });
  }
});

// List all users (admin)
router.get('/users', auth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    res.json({ success: true, users });
  } catch (err) {
    console.error('Admin /users error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

module.exports = router;
