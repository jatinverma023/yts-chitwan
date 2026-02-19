// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const registrationRoutes = require('./routes/registrations');


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log("🎉 Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

/* -----------------------------------------------------------
   ✅ CORS CONFIGURATION (LOCAL DEV ONLY)
------------------------------------------------------------ */

const allowedOrigins = [
  "http://localhost:5174",   // Vite dev server (frontend)
  "http://localhost:3000",   // optional: CRA dev server (if used)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn(`❌ CORS blocked for origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// explicit preflight handler
app.options("*", cors());


const vercelPreviewRegex = /^https:\/\/yts-chitwan-[a-z0-9-]+\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
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

app.options("*", cors());

/* -----------------------------------------------------------
   Middleware
------------------------------------------------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -----------------------------------------------------------
   ✅ HEALTH CHECK ROUTE
------------------------------------------------------------ */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    server: "OK",
    database: "Connected",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

/* -----------------------------------------------------------
   Routes
------------------------------------------------------------ */
app.get('/', (req, res) => {
  res.status(200).json({
    message: "🚀 YTS Chitwan Backend is running!",
    server: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api', registrationRoutes);
app.use('/api', require('./routes/dashboard')); // ADD THIS LINE

/* -----------------------------------------------------------
   Global Error Handler
------------------------------------------------------------ */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : "Server error",
  });
});

/* -----------------------------------------------------------
   404 Handler
------------------------------------------------------------ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

/* -----------------------------------------------------------
   Start Server (Local Development)
------------------------------------------------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;