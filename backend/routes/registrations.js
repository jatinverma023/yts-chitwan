const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { auth, requireAdmin } = require('../middleware/auth'); // CORRECT IMPORT

// Public route: Register for an event
router.post('/events/:eventId/register', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, email, phone, message } = req.body;

    // Validate event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      eventId,
      email: email.toLowerCase()
    });

    if (existingRegistration) {
      return res.status(400).json({ 
        message: 'You are already registered for this event' 
      });
    }

    // Create registration
    const registration = new Registration({
      eventId,
      name,
      email: email.toLowerCase(),
      phone,
      message
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      registration
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

// Admin route: Get all registrations (requires authentication)
router.get('/registrations', auth, async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('eventId', 'title category date location')
      .sort({ registeredAt: -1 });

    res.json({ 
      registrations,
      count: registrations.length 
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch registrations', 
      error: error.message 
    });
  }
});

// Admin route: Get registrations for a specific event
router.get('/events/:eventId/registrations', auth, async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({ eventId })
      .sort({ registeredAt: -1 });

    res.json({ 
      registrations,
      count: registrations.length 
    });
  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch event registrations', 
      error: error.message 
    });
  }
});

// Admin route: Delete a registration
router.delete('/registrations/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findByIdAndDelete(id);

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ 
      success: true,
      message: 'Registration deleted successfully' 
    });
  } catch (error) {
    console.error('Delete registration error:', error);
    res.status(500).json({ 
      message: 'Failed to delete registration', 
      error: error.message 
    });
  }
});

// Admin route: Update registration status
router.put('/registrations/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ 
      success: true,
      registration 
    });
  } catch (error) {
    console.error('Update registration error:', error);
    res.status(500).json({ 
      message: 'Failed to update registration', 
      error: error.message 
    });
  }
});

module.exports = router;