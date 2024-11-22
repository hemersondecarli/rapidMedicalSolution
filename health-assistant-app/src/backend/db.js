const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI; // Get MongoDB URI from .env
    if (!MONGO_URI) throw new Error('MongoDB URI is missing in the .env file');

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectDB;
