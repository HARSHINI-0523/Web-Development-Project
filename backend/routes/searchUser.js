const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    const { username } = req.query;
    try {
        
        const usersCollection = await User.find(); // Retrieve all users from the collection
       
        // Make sure the collection exists
        if (!usersCollection) {
            throw new Error("usersCollection is not available");
        }

        const matchedUsers = await User.find({ username: { $regex: new RegExp(username, 'i') } });


        console.log("Matched users:", matchedUsers);
        res.json(matchedUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});



module.exports = router;