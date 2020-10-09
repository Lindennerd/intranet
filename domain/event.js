const eventRepository = require('../repository/models/event.model');
const mongoose = require('mongoose');
const moment = require('moment');

function EventDomain() {
    async function createEvent(event, creator) {
        console.log(event);

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
            date: moment.parseZone(event.date + ' ' + event.hours, 'DD/MM/yyyy HH:mm', 'pt-BR').valueOf()
        };

        return await eventRepository.create(eventModel);
    }

    return { createEvent }
}

module.exports = EventDomain();
