const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // MongoDB connection
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001; // Use PORT from .env or default to 5001

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
