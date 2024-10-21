const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware.js');
const upload = require('../middleware/upload');

router.post('/', auth.protect, upload.single('image'), async (req, res) => {
    try {
        const { title,description,category } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        if (!title) {
            return res.status(400).json({ msg: 'Title is required' });
        }

        const newPost = new Post({
            title,
            description,
            category,
            imageUrl: req.file.filename,
            user: req.user.id,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.get('/user', auth.protect,async (req, res) => {
    try {
        
      const posts = await Post.find({ user: req.user.id });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;