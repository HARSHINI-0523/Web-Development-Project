const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 8,
            match: /^[A-Za-z_]{8,}$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            default: 'Other',
        },
        bio: {
            type: String,
            maxlength: 500,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: '',
        },
        photo: {
            type: String, 
            default: '',
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
