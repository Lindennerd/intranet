const express = require('express');
const auth = require('../domain/authentication');
const usersDomain = require('../domain/users');

const router = express.Router();

router.get('/', auth.authorize, async function(req, res) {
    const user = await usersDomain.getById(req.session.user);
    res.render('profile', {title: 'Perfil de ' + user.name, user: user});
});

router.post('/profile-image-update', auth.authorize, async function(req, res, next){
    if(!req.files || req.files.length < 0) {
        res.redirect('/');
    } else {
        usersDomain.changeProfilePicture(req.files.profile, req.session.user);
        res.redirect('/');
    }
});

router.post('/background-update', auth.authorize, async function(req, res, next) {
    if(!req.files || req.files.length < 0) {
        res.redirect('/');
    } else {
        usersDomain.changeBackgroundPicture(req.files.background, req.session.user);
        res.redirect('/');
    }
});

router.post('/update-information', auth.authorize, async function(req, res, next) {
    usersDomain.updateInformation(req.body, req.session.user);
    res.redirect('/');
});

module.exports = router;
