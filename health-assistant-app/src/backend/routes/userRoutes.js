const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model
const router = express.Router();

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

        // Include gpName in the response
        res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                gpName: user.gpName, // Include GP name
            },
        });
    } catch (error) {
        console.error('Error in /login route:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
