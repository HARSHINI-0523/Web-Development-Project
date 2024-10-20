const express = require('express');
const router = express.Router();
const Repost = require('../models/Repost');
const auth = require('../middleware/authMiddleware.js');
// Get user's reposts
router.get('/user', auth.protect, async (req, res) => {
  try {
    const reposts = await Repost.find({ user: req.user.id });
    res.json(reposts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
