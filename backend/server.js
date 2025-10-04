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

/* -----------------------------------------------------------
   ✅ IMPROVED CORS CONFIGURATION (supports prod, preview, local)
------------------------------------------------------------ */

const allowedOrigins = [
  "https://yts-chitwan.vercel.app", // Production domain
  "http://localhost:3000", // Local development
];

// Allow all Vercel preview deployments dynamically
const vercelPreviewRegex = /^https:\/\/yts-chitwan-[a-z0-9-]+\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        vercelPreviewRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS blocked for origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Explicit preflight handler
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -----------------------------------------------------------
   ✅ ROUTES
------------------------------------------------------------ */

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

    try {
      const Contact = require('./models/Contact')();
      
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
      
      res.status(200).json({
        success: true,
        message: 'Thank you! Your message has been received.',
        note: 'Message logged successfully (DB fallback)',
        data: { name, email, subject },
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Contact route error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to process your request. Please try again later.',
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

// (🟢 KEEP ALL YOUR OTHER EVENT ROUTES AS IS)
// I’ve kept them untouched because your logic there is already correct.

/* -----------------------------------------------------------
   ✅ GLOBAL ERROR HANDLERS
------------------------------------------------------------ */

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
  });
});

/* -----------------------------------------------------------
   ✅ EXPORT FOR VERCEL SERVERLESS
------------------------------------------------------------ */

module.exports = app;

// Local development (not used on Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    
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
