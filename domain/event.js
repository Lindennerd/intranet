const eventRepository = require('../repository/models/event.model');
const mongoose = require('mongoose');
const moment = require('moment');
const eventModel = require('../repository/models/event.model');

function EventDomain() {

    async function createEvent(event, creator) {
        const date = moment.parseZone(event.date + ' ' + event.hours, 'DD/MM/yyyy HH:mm', 'pt-BR').valueOf();

        const eventModel = {
            name: event.name,
            description: event.description,
            attendees: event.attendees.map(function (att) {
                const attendee = JSON.parse(att);
                return {
                    name: attendee.name,
                    id: mongoose.Types.ObjectId(attendee.id)
                };
            }),
            duration: event.duration,
            createdBy: mongoose.Types.ObjectId(creator.toString()),
            date: new Date(date).toUTCString()
        };

        return await eventRepository.create(eventModel);
    }

    async function listEventsForLoggedUser(user) {
        const userId = mongoose.Types.ObjectId(user);
        const events = await eventModel
            .find({ $or: [{ createdby: userId }, { 'attendees.id': userId }], $and: [{ canceled: false }] })
            .sort({ date: -1 })
            .exec();

        return events.map(function (event) {
            return event.toObject();
        });
    }

    async function getEvent(eventId) {
        return await eventRepository.findById(eventId).exec();
    }

    async function cancelEvent(eventId, user) {
        const event = await eventRepository.findById(eventId).exec();
        if (event.createdBy.toString() === user.toString()) {
            event.canceled = true;
            event.save();
        }
    }

    async function addComment(newComment, user) {
        const event = await eventRepository.findById(newComment.eventId).exec();
        if (!event.comments) event.comments = [];
        event.comments.push({
            comment: newComment.newComment,
            commentBy: mongoose.Types.ObjectId(user.toString())
        });

        return await event.save();
    }

    return { createEvent, listEventsForLoggedUser, getEvent, cancelEvent, addComment }
}

module.exports = EventDomain();