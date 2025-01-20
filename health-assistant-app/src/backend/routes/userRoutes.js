const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    console.log('Registration request received:', req.body); // Debugging log

    const { name, email, password, confirmPassword, gpName } = req.body;

    // Validate input fields
    if (!name || !email || !password || !confirmPassword || !gpName) {
        console.log('Missing required fields during registration');
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        console.log('Passwords do not match during registration');
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email already registered:', email);
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
        console.log('User registered successfully:', newUser.email);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    console.log('Login request received:', req.body); // Debugging log

    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        console.log('Missing email or password during login');
        return res.status(400).json({ message: 'Email and password are required' });
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
            return res.status(401).json({ message: 'Invalid password' });
        }

        console.log('User logged in successfully:', user.email);

        // Successful login response
        res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                gpName: user.gpName,
            },
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
