const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/contact received:', req.body); // Add this line for debugging
    
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    console.log('Contact created:', contact); // Add this line for debugging

    res.status(201).json({
      message: 'Message sent successfully',
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact route error:', error); // Add this line for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
