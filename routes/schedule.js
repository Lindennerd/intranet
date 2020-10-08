const express = require('express');
const auth = require('../domain/authentication');
const usersDomain = require('../domain/users');
const eventDomain = require('../domain/event');

const router = express.Router();

router.get('/', auth.authorize, async function (req, res, next) {
    const users = await usersDomain.listUsers();
    res.render('schedule', { title: 'Agenda', users: users });
});

router.post('/new-event', auth.authorize, async function (req, res, next) {
    const event = req.body;
    eventDomain.createEvent(event, req.session.user);
});

module.exports = router;