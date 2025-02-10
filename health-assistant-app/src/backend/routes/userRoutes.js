const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // User model
const Sentiment = require('../models/Sentiment'); // Sentiment model for mood tracking
const router = express.Router();

// ✅ Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword, gpName } = req.body;

    if (!name || !email || !password || !confirmPassword || !gpName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gpName,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
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

// ✅ Check if user has already logged mood for today
router.get('/mood-selection/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingMood = await Sentiment.findOne({ userId, date: { $gte: today } });

        if (existingMood) {
            return res.status(200).json({ moodLogged: true, mood: existingMood.mood });
        } else {
            return res.status(200).json({ moodLogged: false });
        }
    } catch (error) {
        console.error('Error checking mood:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Mood Tracking (Ensuring API Route is Correct)
router.post('/mood-selection', async (req, res) => {
    const { userId, mood } = req.body;

    if (!userId || !mood) {
        return res.status(400).json({ message: 'User ID and mood are required' });
    }

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if mood is already logged for today
        const existingMood = await Sentiment.findOne({ userId, date: { $gte: today } });

        if (existingMood) {
            return res.status(400).json({ message: 'Mood for today is already logged' });
        }

        // Save new mood entry
        const newMoodEntry = new Sentiment({
            userId,
            mood,
            date: new Date(),
        });

        await newMoodEntry.save();
        res.status(201).json({ message: 'Mood recorded successfully', mood: newMoodEntry });
    } catch (error) {
        console.error('Error recording mood:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Change Password
router.post('/change-password', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
