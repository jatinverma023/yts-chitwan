const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://yts-chitwann.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Health Check Route
app.get('/', (req, res) => {
  console.log('✅ GET / route hit!');
  res.status(200).json({
    message: '🚀 YTS Chitwan Backend API is running!',
    status: 'success',
    database: 'Cloud MySQL',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test Route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test route working!', 
    server: 'alive' 
  });
});

// POST Contact
app.post('/api/contact', async (req, res) => {
  console.log('📝 Contact form received:', req.body);
  
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'All fields required' 
      });
    }

    try {
      const Contact = require('./models/Contact');
      const contact = await Contact.create({
        name, email, subject, message
      });

      console.log('✅ Contact saved:', contact.id);
      
      res.status(201).json({
        message: 'Contact saved successfully!',
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          createdAt: contact.createdAt
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError.message);
      res.status(200).json({
        message: 'Contact received (database temporarily unavailable)',
        data: req.body,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Contact route error:', error.message);
    res.status(500).json({
      message: 'Error processing contact',
      error: error.message
    });
  }
});

// GET all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const Contact = require('./models/Contact');
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
      limit: 50
    });
    
    res.json({
      message: 'Contacts retrieved',
      count: contacts.length,
      contacts
    });
  } catch (error) {
    console.error('❌ Get contacts error:', error.message);
    res.status(500).json({
      message: 'Error retrieving contacts',
      error: error.message
    });
  }
});

// GET all events
app.get('/api/events', async (req, res) => {
  try {
    const Event = require('./models/Event');
    const events = await Event.findAll({
      where: { isActive: true },
      order: [['date', 'ASC']]
    });
    
    console.log(`📅 Retrieved ${events.length} events`);
    res.json({
      message: 'Events retrieved',
      count: events.length,
      events
    });
  } catch (error) {
    console.error('❌ Get events error:', error.message);
    res.status(500).json({
      message: 'Error retrieving events',
      error: error.message
    });
  }
});

// CREATE event
app.post('/api/events', async (req, res) => {
  try {
    const { title, description, date, location, category, image } = req.body;
    
    if (!title || !description || !date || !location) {
      return res.status(400).json({ 
        message: 'All fields required' 
      });
    }

    const Event = require('./models/Event');
    const event = await Event.create({
      title,
      description,
      date: new Date(date),
      location,
      category: category || 'workshop',
      image: image || '',
      isActive: true
    });

    console.log('✅ Event created:', event.title);
    
    res.status(201).json({
      message: 'Event created!',
      event
    });
  } catch (error) {
    console.error('❌ Create event error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// CREATE demo events
app.post('/api/events/demo', async (req, res) => {
  try {
    const Event = require('./models/Event');
    
    const demoEvents = [
      {
        title: "React Workshop for Beginners",
        description: "Learn React.js basics with hands-on projects",
        date: new Date("2025-10-15T14:00:00Z"),
        location: "YTS Chitwan Campus",
        category: "workshop",
        isActive: true
      },
      {
        title: "Digital Nepal Seminar",
        description: "Exploring digital transformation in Nepal",
        date: new Date("2025-11-05T15:30:00Z"),
        location: "YTS Conference Room",
        category: "seminar",
        isActive: true
      },
      {
        title: "YTS Coding Challenge 2025",
        description: "Annual programming competition",
        date: new Date("2025-11-15T09:00:00Z"),
        location: "YTS Computer Lab",
        category: "competition",
        isActive: true
      }
    ];

    const events = await Event.bulkCreate(demoEvents);
    
    res.status(201).json({
      message: `${events.length} demo events created!`,
      count: events.length,
      events
    });
  } catch (error) {
    console.error('❌ Demo events error:', error);
    res.status(500).json({ 
      message: 'Error creating demo events', 
      error: error.message 
    });
  }
});

// UPDATE event
app.put('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location, category, image } = req.body;

    const Event = require('./models/Event');
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.update({
      title: title || event.title,
      description: description || event.description,
      date: date ? new Date(date) : event.date,
      location: location || event.location,
      category: category || event.category,
      image: image !== undefined ? image : event.image
    });

    res.json({
      message: 'Event updated!',
      event
    });
  } catch (error) {
    console.error('❌ Update event error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// DELETE event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const Event = require('./models/Event');
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const eventTitle = event.title;
    await event.destroy();

    res.json({
      message: 'Event deleted!',
      deletedEvent: { id, title: eventTitle }
    });
  } catch (error) {
    console.error('❌ Delete event error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// GET single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const Event = require('./models/Event');
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      message: 'Event retrieved',
      event
    });
  } catch (error) {
    console.error('❌ Get event error:', error.message);
    res.status(500).json({
      message: 'Error retrieving event',
      error: error.message
    });
  }
});

// Dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const Contact = require('./models/Contact');
    const Event = require('./models/Event');
    
    const contactCount = await Contact.count();
    const eventCount = await Event.count({ where: { isActive: true } });
    const pendingContacts = await Contact.count({ where: { status: 'pending' } });
    
    res.json({
      message: 'Dashboard stats retrieved',
      stats: {
        totalContacts: contactCount,
        activeEvents: eventCount,
        pendingContacts,
        growth: '24%'
      }
    });
  } catch (error) {
    console.error('❌ Dashboard stats error:', error.message);
    res.status(500).json({
      message: 'Error retrieving stats',
      error: error.message
    });
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: err.message 
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    message: 'API endpoint not found',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /test',
      'POST /api/contact',
      'GET /api/contacts',
      'GET /api/events',
      'POST /api/events',
      'POST /api/events/demo',
      'PUT /api/events/:id',
      'DELETE /api/events/:id',
      'GET /api/events/:id',
      'GET /api/dashboard/stats'
    ]
  });
});

// **CRITICAL FOR VERCEL**: Export app for serverless
module.exports = app;

// Only listen on port for LOCAL development
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    
    // Initialize database for local dev
    setTimeout(async () => {
      try {
        console.log('🔌 Connecting to database...');
        const { connectDB } = require('./config/database');
        await connectDB();
        console.log('🎉 Database connected!');
      } catch (error) {
        console.error('⚠️ Database connection failed:', error.message);
      }
    }, 2000);
  });
}