const userRepository = require('../repository/models/user.model');

function authenticate() {

    function authorize(req, res, next) {
        if(req.session && req.session.user) {
            userRepository.findById(req.session.user)
                .then(function(user) {
                    if(!user) res.redirect('/security');

                    req.session.user = user._id;
                    res.locals.user = user;

                    next();
                })
                .catch(function(error) {
                    res.redirect('/security');
                })
        } else {
            res.redirect('/security');
        }
    }

    function isAdmin(req, res, next) {
        if(req.session && req.session.user) {
            userRepository.findById(req.session.user)
                .then(function(user) {
                    if(!user) res.redirect('/security');
                    if(!user.isAdmin) res.redirect('/');
                    else next();
                })
                .catch(function(error) {
                    res.redirect('/security');
                })
        } else {
            res.redirect('/security');
        }
    }

    return {
        authorize: authorize,
        isAdmin: isAdmin
    }
}

module.exports = authenticate();