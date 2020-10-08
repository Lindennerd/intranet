const eventRepository = require('../repository/models/event.model');

function EventDomain() {
    function createEvent(event, creator) {
        console.log(event);
    }

    return { createEvent }
}

module.exports = EventDomain();
