const express = require('express');
const auth = require('../domain/authentication');
const usersDomain = require('../domain/users');
const eventDomain = require('../domain/event');

const router = express.Router();

router.get('/', auth.authorize, async function (req, res, next) {
    try {
        const users = await usersDomain.listUsers();
        const events = await eventDomain.listEventsForLoggedUser(req.session.user);
        res.render('schedule', { title: 'Agenda', users: users, events: events });
    } catch (error) {
        res.locals.error = error;
        res.redirect('/');
    }
});

router.post('/new-event', auth.authorize, async function (req, res, next) {
    try {
        eventDomain.createEvent(event, req.session.user);
        res.redirect('/schedule');
    } catch (error) {
        res.locals.error = error;
        res.redirect('/schedule');
    }
});

module.exports = router;