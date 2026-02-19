const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ MONGODB_URI not found');
      return false;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
  dbName: "yts_main",   
});
console.log('✅ MongoDB Atlas connection established successfully (DB:', mongoose.connection.db.databaseName + ')');

    return true;
  } catch (error) {
    console.error('❌ Unable to connect to MongoDB Atlas:', error.message);
    return false;
  }
};

module.exports = { connectDB };
