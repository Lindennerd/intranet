const express = require('express');
const auth = require('../domain/authentication');

const router = express.Router();

router.get('/', auth.authorize, function(req, res, next) {
    res.render('schedule', {title: 'Agenda'});
});

module.exports = router;