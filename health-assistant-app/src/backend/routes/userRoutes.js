const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword, gpName } = req.body;

    // Log the request body for debugging
    console.log('Request Body:', req.body);

    // Validate input fields
    if (!name || !email || !password || !gpName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate passwords match
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

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter your Email and password' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        // Return success response
        res.status(200).json({
            message: 'Login successful',
            user: { name: user.name, email: user.email, gpName: user.gpName },
        });
    } catch (error) {
        console.error('Error in /login route:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
