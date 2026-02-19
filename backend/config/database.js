const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("⚠️ MONGODB_URI not found");
      return false;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log(
      "✅ MongoDB Atlas connected (DB:",
      conn.connection.db.databaseName,
      ")"
    );

    return true;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    return false;
  }
};

module.exports = { connectDB };
