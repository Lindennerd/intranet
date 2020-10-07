const express = require('express');
const auth = require('../domain/authentication');
const usersDomain = require('../domain/users');

const router = express.Router();

router.get('/', auth.authorize, async function(req, res) {
    const user = await usersDomain.getById(req.session.user);
    res.render('profile', {title: 'Perfil de ' + user.name, user: user});
});

module.exports = router;
