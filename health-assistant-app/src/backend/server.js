const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // MongoDB connection
const userRoutes = require('./routes/userRoutes'); // Import user routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
