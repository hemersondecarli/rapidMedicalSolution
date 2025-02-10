const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // MongoDB Connection
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes'); 
const sentimentRoutes = require('./routes/sentimentRoutes'); // ✅ Added

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // ✅ Required to parse JSON requests

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/sentiment', sentimentRoutes); // ✅ Ensure this is included


// ✅ Start the Server
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
