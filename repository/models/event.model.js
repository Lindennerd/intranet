const moment = require('moment');
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
    createdBy: mongoose.SchemaTypes.ObjectId,
    comments: [{
        comment: String,
        commentDate: { type: Date, default: new Date() },
        commentBy: mongoose.SchemaTypes.ObjectId
    }]
}, { collection: 'event', toObject: { virtuals: true } });

eventSchema.virtual('formattedDate').get(function () {
    return moment(this.date).format(process.env.DATE_FORMAT)
});

eventSchema.virtual('formattedCreationDate').get(function () {
    return moment(this.createdAt).format(process.env.DATE_FORMAT)
});

eventSchema.virtual('attendeesNames').get(function () {
    return this.attendees
        .map(att => att.name)
        .join(',');
})

module.exports = mongoose.model('event', eventSchema);