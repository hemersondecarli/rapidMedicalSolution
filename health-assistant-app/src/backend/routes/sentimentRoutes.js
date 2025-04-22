const express = require('express');
const Sentiment = require('../models/Sentiment'); // Ensure this model exists
const router = express.Router();

// Save The Mood selection for a user
router.post('/record', async (req, res) => {
    try {
        const { userId, mood } = req.body;

        if (!userId || !mood) {
            return res.status(400).json({ message: 'User ID and mood are required' });
        }

        console.log(`🟢 Storing Mood: ${mood} for User ID: ${userId}`);

        // Save or Update User Mood
        await Sentiment.create({ userId, mood });

        res.status(200).json({ message: 'Mood recorded successfully' });
    } catch (error) {
        console.error('❌ Error saving mood:', error.message);
        res.status(500).json({ message: 'Server error while saving mood' });
    }
});

module.exports = router;
