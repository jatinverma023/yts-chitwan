const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');

// Get all team members (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
