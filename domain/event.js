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
            createdby: mongoose.Types.ObjectId(creator),
            date: new Date(date).toUTCString()
        };

        return await eventRepository.create(eventModel);
    }

    async function listEventsForLoggedUser(user) {
        const userId = mongoose.Types.ObjectId(user);
        const events = await eventModel
            .find({ $or: [{ createdby: userId }, { 'attendees.id': userId }] })
            .sort({ date: -1 })
            .lean()
            .exec();

        return events;
    }

    return { createEvent, listEventsForLoggedUser }
}

module.exports = EventDomain();