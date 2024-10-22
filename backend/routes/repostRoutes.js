const express = require('express');
const router = express.Router();
const Repost = require('../models/Repost');
const Post = require('../models/Post'); // Ensure this line is present
const auth = require('../middleware/authMiddleware.js');
// Get user's reposts
router.get('/user', auth.protect, async (req, res) => {
  try {
    const reposts = await Repost.find({ userId: req.user.id });
    res.json(reposts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// New route for reposting a post
router.post('/:postId', auth.protect, async (req, res) => {
  try {
      const { postId } = req.params;
      
      // Check if the post exists
      const postExists = await Post.findById(postId);
      if (!postExists) {
          return res.status(404).json({ message: 'Post not found.' });
      }

      // Create a new repost entry
      const newRepost = new Repost({
          userId: req.user.id,
          postId,
      });
      
      await newRepost.save();

      res.status(201).json(newRepost);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

module.exports = router;
