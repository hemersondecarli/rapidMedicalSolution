const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    console.log('debugging request body', req.body); // Log incoming data

    const { name, email, password, confirmPassword, gpName } = req.body;

    // Validate input fields
    if (!name || !email || !password || !confirmPassword || !gpName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate matching passwords
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gpName,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in /register route:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
