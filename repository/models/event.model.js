const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    attendees: [{
        id: mongoose.SchemaTypes.ObjectId,
        name: String
    }],
    date: Date,
    duration: String,
    createdAt: { type: Date, default: new Date() },
    canceled: { type: Boolean, default: false },
    createdBy: mongoose.SchemaTypes.ObjectId
}, { collection: 'event' });

module.exports = mongoose.model('event', eventSchema);