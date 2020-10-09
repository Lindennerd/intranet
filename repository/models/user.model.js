const mongoose = require('mongoose');
mongoose.set('debug', false)

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    isAdmin: Boolean,
    password: String,
    profile: {
        background: { data: Buffer, contentType: String },
        "profile-image": { data: Buffer, contentType: String }
    }
},
    {
        collection: 'user',
        toObject: { virtuals: true }
    });

userSchema.virtual('bgDataURI').get(function () {
    if (!this.profile.background) {
        return "/images/office.jpg"
    } else {
        return `data:${this.profile.background.contentType};base64,${Buffer.from(this.profile.background.data).toString('base64')}`;
    }
});

userSchema.virtual('profileDataURI').get(function () {
    if (!this.profile["profile-image"]) {
        return "/images/person.jpg"
    } else {
        return `data:${this.profile["profile-image"].contentType};base64,${Buffer.from(this.profile["profile-image"].data).toString('base64')}`;
    }
});

module.exports = mongoose.model('user', userSchema);