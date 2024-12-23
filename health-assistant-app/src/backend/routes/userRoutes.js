const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model
const router = express.Router();

// Register a new user
router.post('/login', async (req, res) => {
    console.log('Login request body:', req.body); // Log incoming request data

    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'Please enter your Email and password' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found with email:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({ message: 'Wrong password' });
        }

        // Success
        console.log('User logged in successfully:', user);
        res.status(200).json({
            message: 'Login successful',
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error in login route:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
