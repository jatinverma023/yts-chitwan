const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if we're using a cloud database URL (Neon/Railway)
const DATABASE_URL = process.env.DATABASE_URL;

let sequelize;

if (DATABASE_URL) {
  // PRODUCTION: Use Neon/Railway connection string
  console.log('🌐 Using cloud database (Neon)');
  
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres', // Neon uses PostgreSQL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: false,
    }
  });
} else {
  // LOCAL DEVELOPMENT: Use MAMP MySQL
  console.log('💻 Using local MAMP MySQL database');
  
  sequelize = new Sequelize(
    process.env.DB_NAME || 'yts_chitwan',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'root',
    {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 8889,
      dialect: 'mysql', // MAMP uses MySQL
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      define: {
        timestamps: true,
        underscored: false,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      // Retry logic for MAMP connection issues
      retry: {
        match: [
          /ETIMEDOUT/,
          /EHOSTUNREACH/,
          /ECONNRESET/,
          /ECONNREFUSED/,
          /ESOCKETTIMEDOUT/,
          /EPIPE/,
          /EAI_AGAIN/,
          /SequelizeConnectionError/,
          /SequelizeConnectionRefusedError/,
          /SequelizeHostNotFoundError/,
          /SequelizeHostNotReachableError/,
          /SequelizeInvalidConnectionError/,
          /SequelizeConnectionTimedOutError/
        ],
        max: 3
      }
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    
    if (DATABASE_URL) {
      console.log('✅ Cloud database (Neon) connected successfully!');
    } else {
      console.log('✅ MAMP MySQL database connected successfully!');
    }
    
    // Only sync in development or when explicitly told to
    if (process.env.NODE_ENV === 'development' || process.env.SYNC_DB === 'true') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synchronized');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('Connection details:', {
      usingCloudDB: !!DATABASE_URL,
      host: process.env.DB_HOST || 'cloud',
      port: process.env.DB_PORT || 'cloud',
      database: process.env.DB_NAME || 'cloud'
    });
    
    // Don't exit process - let server continue running
    return false;
  }
};

module.exports = { sequelize, connectDB };
