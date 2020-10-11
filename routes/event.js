const express = require('express');
const auth = require('../domain/authentication');
const eventDomain = require('../domain/event');

const router = express.Router();

router.get('/:id', auth.authorize, async function (req, res, next) {
    try {
        const eventId = req.params.id;
        const event = await eventDomain.getEvent(eventId);

        res.render('event', { title: 'Evento: ' + event.name, event: event });
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.redirect('/');
    }
});

router.get('/cancel/:id', auth.authorize, async function (req, res, next) {
    try {
        const eventId = req.params.id;
        eventDomain.cancelEvent(eventId, req.session.user);

        res.redirect('/schedule');
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.redirect('/');
    }
});

module.exports = router;