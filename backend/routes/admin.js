const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const User = require('../models/User');
const Event = require('../models/Event');
const Contact = require('../models/Contact');

// Example admin stats route
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const [usersCount, eventsCount, contactsCount] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Contact.countDocuments()
    ]);

    res.json({ success: true, stats: { usersCount, eventsCount, contactsCount } });
  } catch (err) {
    console.error('Admin /stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// Example: list all events (admin)
router.get('/events', isAdmin, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json({ success: true, events });
  } catch (err) {
    console.error('Admin /events error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch events' });
  }
});

// Example: delete event
router.delete('/events/:id', isAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    console.error('Admin delete event error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete event' });
  }
});

// Example: list all users (admin)
router.get('/users', isAdmin, async (req, res) => {
  try {
    // optionally filter/limit
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    res.json({ success: true, users });
  } catch (err) {
    console.error('Admin /users error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

module.exports = router;
