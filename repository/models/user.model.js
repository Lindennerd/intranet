const mongoose = require('mongoose');
mongoose.set('debug', true);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    isAdmin: Boolean,
    password: String,
    profile: {
        background: String,
        "profile-image": String
    }
}, { collection: 'user' });

module.exports = mongoose.model('user', userSchema);