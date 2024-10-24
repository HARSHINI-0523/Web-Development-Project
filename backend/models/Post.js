const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    madeBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    onDate: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    category:  String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Post', PostSchema);
