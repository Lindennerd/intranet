const userRepository = require('../repository/user.repository');

function authenticate() {

    function authorize(req, res, next) {
        if(req.session && req.session.user) {
            userRepository.getById(req.session.user)
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
            userRepository.getById(req.session.user)
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