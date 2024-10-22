const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware.js');
const upload = require('../middleware/upload');

// Add a comment
router.post('/:postId/comment', auth.protect, async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    
    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newComment = {
            comment,
            madeBy: req.user._id,  // Assuming the user's ID is extracted from the JWT
            onDate: new Date()
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json(post.comments); // Return all comments after adding
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//fetch comments
router.get('/:postId/comments', async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId).populate('comments.madeBy', 'username'); // Populating madeBy with username from User model
        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json(post.comments); // Return all comments for the post
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Like a post
router.patch('/:postId/like', auth.protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        
        // Check if the user has already liked the post
        if (!post.likedBy.includes(req.user._id)) {
            // Add the user's ID to the likedBy array
            post.likedBy.push(req.user._id);
            await post.save();
            return res.status(200).json({ message: 'Post liked successfully', post });
        } else {
            return res.status(400).json({ message: 'You have already liked this post' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Unlike a post
router.patch('/:postId/unlike', auth.protect , async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        
        // Check if the user has already liked the post
        if (post.likedBy.includes(req.user._id)) {
            // Remove the user's ID from the likedBy array
            post.likedBy = post.likedBy.filter(userId => userId.toString() !== req.user._id.toString());
            await post.save();
            return res.status(200).json({ message: 'Post unliked successfully', post });
        } else {
            return res.status(400).json({ message: 'You have not liked this post' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


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