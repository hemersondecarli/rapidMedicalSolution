const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // MongoDB connection
const userRoutes = require('./routes/userRoutes'); // User-related routes
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001; // Use PORT from .env or default to 5001

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// User routes
app.use('/api/users', userRoutes); // All user-related routes will be prefixed with /api/users

// Global error handler (for catching unhandled errors)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
