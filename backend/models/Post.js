const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    caption: { type: String, required: true },
    imageUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
