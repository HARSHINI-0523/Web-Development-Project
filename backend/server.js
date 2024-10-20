const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const searchUserRoutes = require('./routes/searchUser');
const postRoutes = require('./routes/postRoutes'); // Make sure to import your post routes
const repostRoutes = require('./routes/repostRoutes');
const app = express();

// Middleware
 app.use(cors());
 app.use(express.json());

// Serve static folder for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/searchUser', searchUserRoutes);
app.use('/api/posts', postRoutes); // Ensure this line is added
app.use('/reposts', repostRoutes);
// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
