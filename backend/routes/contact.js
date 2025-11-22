const express = require('express');
const Contact = require('../models/Contact');
const { auth } = require('../middleware/auth'); // Import auth middleware
const router = express.Router();

// Get all contacts (ADMIN ONLY - PROTECTED)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.json({
      success: true,
      message: 'Contacts retrieved',
      contacts: contacts,  // Changed from 'data' to 'contacts'
      count: total,        // Added count for easy access
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Get contacts error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contacts',
      error: error.message
    });
  }
});

// Get single contact (ADMIN ONLY)
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create contact (PUBLIC - NO AUTH REQUIRED)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, phone, inquiryType } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled',
        missing: {
          name: !name,
          email: !email,
          subject: !subject,
          message: !message
        }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      subject: subject.trim(),
      message: message.trim(),
      inquiryType: inquiryType?.trim() || null,
      ipAddress,
      userAgent,
      status: 'pending'
    });

    await contact.save();

    console.log('✅ Contact saved to DB:', contact._id);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        submittedAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Contact creation error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to process your request. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
});

// Update contact status (ADMIN ONLY)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete contact (ADMIN ONLY)
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;