const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/profile/:userId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    const { username, gender, bio, city, country, photo } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (username) user.username = username;
        if (gender) user.gender = gender;
        if (bio) user.bio = bio;
        if (city) user.city = city;
        if (country) user.country = country;
        if (photo) user.photo = photo;

        await user.save();

        res.json({
            _id: user._id,
            email: user.email,
            username: user.username,
            gender: user.gender,
            bio: user.bio,
            city: user.city,
            country: user.country,
            photo: user.photo,
        });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
