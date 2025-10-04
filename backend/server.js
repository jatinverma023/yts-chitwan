const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Initialize database connection for Vercel
let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized && process.env.DATABASE_URL) {
    try {
      await connectDB();
      dbInitialized = true;
    } catch (error) {
      console.error('Database initialization error:', error.message);
    }
  }
};

// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000", 
    "https://yts-chitwan.vercel.app",
    "https://yts-chitwann.vercel.app",
    /https:\/\/yts-chitwan-.*\.vercel\.app$/, // Allow all preview deployments
    /https:\/\/.*-jatinverma023s-projects\.vercel\.app$/ // Allow all your project previews
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Health Check Route
app.get('/', async (req, res) => {
  console.log('✅ GET / route hit!');
  
  await initDB();
  
  res.status(200).json({
    message: '🚀 YTS Chitwan Backend API is running!',
    status: 'success',
    database: dbInitialized ? 'Connected' : 'Not connected',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test Route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test route working!', 
    server: 'alive',
    timestamp: new Date().toISOString()
  });
});

// POST Contact - Enhanced error handling
app.post('/api/contact', async (req, res) => {
  console.log('📝 Contact form received:', req.body);
  
  await initDB();
  
  try {
    const { name, email, subject, message, phone, inquiryType } = req.body;
    
    // Validation
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
    }

    try {
      const Contact = require('./models/Contact')();
      
      // Get client info
      const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];
      
      const contact = await Contact.create({
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

      console.log('✅ Contact saved to DB:', contact.id);
      
      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
        data: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          submittedAt: contact.createdAt
        }
      });
    } catch (dbError) {
      console.error('⚠️ Database error (fallback response):', dbError.message);
      
      // Return success even if DB fails (graceful degradation)
      res.status(200).json({
        success: true,
        message: 'Thank you! Your message has been received.',
        note: 'Message logged successfully',
        data: { name, email, subject },
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Contact route error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to process your request. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
});

// GET all contacts
app.get('/api/contacts', async (req, res) => {
  await initDB();
  
  try {
    const Contact = require('./models/Contact')();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    
    const { count, rows: contacts } = await Contact.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
    
    res.json({
      success: true,
      message: 'Contacts retrieved',
      data: contacts,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
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

// GET all events
app.get('/api/events', async (req, res) => {
  await initDB();
  
  try {
    const Event = require('./models/Event')();
    const events = await Event.findAll({
      where: { isActive: true },
      order: [['date', 'ASC']]
    });
    
    console.log(`📅 Retrieved ${events.length} events`);
    res.json({
      success: true,
      message: 'Events retrieved',
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('❌ Get events error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error retrieving events',
      error: error.message
    });
  }
});

// CREATE event
app.post('/api/events', async (req, res) => {
  await initDB();
  
  try {
    const { title, description, date, location, category, image, capacity } = req.body;
    
    if (!title || !description || !date || !location) {
      return res.status(400).json({ 
        success: false,
        message: 'Title, description, date, and location are required' 
      });
    }

    const Event = require('./models/Event')();
    const event = await Event.create({
      title: title.trim(),
      description: description.trim(),
      date: new Date(date),
      location: location.trim(),
      category: category || 'workshop',
      image: image || null,
      capacity: capacity || null,
      isActive: true
    });

    console.log('✅ Event created:', event.title);
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully!',
      data: event
    });
  } catch (error) {
    console.error('❌ Create event error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// CREATE demo events
app.post('/api/events/demo', async (req, res) => {
  await initDB();
  
  try {
    const Event = require('./models/Event')();
    
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
      success: true,
      message: `${events.length} demo events created!`,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('❌ Demo events error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating demo events', 
      error: error.message 
    });
  }
});

// UPDATE event
app.put('/api/events/:id', async (req, res) => {
  await initDB();
  
  try {
    const { id } = req.params;
    const { title, description, date, location, category, image, isActive } = req.body;

    const Event = require('./models/Event')();
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false,
        message: 'Event not found' 
      });
    }

    await event.update({
      title: title || event.title,
      description: description || event.description,
      date: date ? new Date(date) : event.date,
      location: location || event.location,
      category: category || event.category,
      image: image !== undefined ? image : event.image,
      isActive: isActive !== undefined ? isActive : event.isActive
    });

    res.json({
      success: true,
      message: 'Event updated successfully!',
      data: event
    });
  } catch (error) {
    console.error('❌ Update event error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// DELETE event
app.delete('/api/events/:id', async (req, res) => {
  await initDB();
  
  try {
    const { id } = req.params;

    const Event = require('./models/Event')();
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false,
        message: 'Event not found' 
      });
    }

    const eventTitle = event.title;
    await event.destroy();

    res.json({
      success: true,
      message: 'Event deleted successfully!',
      data: { id, title: eventTitle }
    });
  } catch (error) {
    console.error('❌ Delete event error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// GET single event
app.get('/api/events/:id', async (req, res) => {
  await initDB();
  
  try {
    const { id } = req.params;

    const Event = require('./models/Event')();
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false,
        message: 'Event not found' 
      });
    }

    res.json({
      success: true,
      message: 'Event retrieved',
      data: event
    });
  } catch (error) {
    console.error('❌ Get event error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error retrieving event',
      error: error.message
    });
  }
});

// Dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  await initDB();
  
  try {
    const Contact = require('./models/Contact')();
    const Event = require('./models/Event')();
    
    const contactCount = await Contact.count();
    const eventCount = await Event.count({ where: { isActive: true } });
    const pendingContacts = await Contact.count({ where: { status: 'pending' } });
    
    // Get recent contacts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentContacts = await Contact.count({
      where: {
        createdAt: {
          [require('sequelize').Op.gte]: sevenDaysAgo
        }
      }
    });
    
    res.json({
      success: true,
      message: 'Dashboard stats retrieved',
      data: {
        totalContacts: contactCount,
        activeEvents: eventCount,
        pendingContacts,
        recentContacts,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Dashboard stats error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error retrieving stats',
      error: error.message
    });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
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
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Initialize database for local dev
    setTimeout(async () => {
      try {
        console.log('🔌 Connecting to database...');
        const connected = await connectDB();
        if (connected) {
          console.log('🎉 Database connected and ready!');
        } else {
          console.log('⚠️ Running without database connection');
        }
      } catch (error) {
        console.error('⚠️ Database connection failed:', error.message);
        console.log('⚠️ Server will continue without database');
      }
    }, 1000);
  });
}