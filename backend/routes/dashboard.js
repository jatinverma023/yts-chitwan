// routes/dashboard.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');
const Contact = require('../models/Contact');
const Registration = require('../models/Registration');
const { auth, requireAdmin } = require('../middleware/auth');

// Get dashboard statistics (ADMIN ONLY)
router.get('/dashboard/stats', auth, requireAdmin, async (req, res) => {
  try {
    // Run all counts in parallel for better performance
    const [usersCount, eventsCount, contactsCount, registrationsCount] = 
      await Promise.all([
        User.countDocuments(),
        Event.countDocuments(),
        Contact.countDocuments(),
        Registration.countDocuments(),
      ]);

    res.json({
      success: true,
      stats: {
        usersCount,
        eventsCount,
        contactsCount,
        registrationsCount,
      },
    });
  } catch (error) {
    console.error('❌ Dashboard stats error:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message 
    });
  }
});

module.exports = router;