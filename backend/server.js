// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const registrationRoutes = require('./routes/registrations');

dotenv.config();

const app = express();

// Connect DB
connectDB()
  .then(() => console.log("🎉 Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

/* -----------------------------------------------------------
   ✅ PRODUCTION + DEV CORS CONFIG
------------------------------------------------------------ */

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://yts-chitwan.vercel.app",
];

const vercelPreviewRegex = /^https:\/\/yts-chitwan-[a-z0-9-]+\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        vercelPreviewRegex.test(origin)
      ) {
        return callback(null, true);
      }

      console.warn(`❌ CORS blocked for origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
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
   Health
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

app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 YTS Chitwan Backend is running!",
    server: "OK",
    timestamp: new Date().toISOString(),
  });
});

/* -----------------------------------------------------------
   Routes
------------------------------------------------------------ */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api', registrationRoutes);
app.use('/api', require('./routes/dashboard'));

/* -----------------------------------------------------------
   Error Handler
------------------------------------------------------------ */

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

/* -----------------------------------------------------------
   404
------------------------------------------------------------ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

/* -----------------------------------------------------------
   Start Server
------------------------------------------------------------ */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
