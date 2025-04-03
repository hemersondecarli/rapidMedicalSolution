const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // MongoDB Connection
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes'); 
const sentimentRoutes = require('./routes/sentimentRoutes');  
const medicationRoutes = require("./routes/medicationRoutes");
const menstrualTrackerRoutes = require("./routes/menstrualTrackerRoutes");
const medicalHistoryRoutes = require("./routes/diagnosisRoutes");
const diagnosisRoutes = require("./routes/diagnosisRoutes");
const symptomRoutes = require("./routes/symptomRoutes");




require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // Required to parse JSON requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/sentiment', sentimentRoutes); 
app.use("/api/medications", medicationRoutes); 
app.use("/api/menstrual_tracker", menstrualTrackerRoutes);
app.use("/api", diagnosisRoutes);
app.use("/api/symptoms", symptomRoutes);

// Start the Server
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
