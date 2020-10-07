const userRepository = require('../../repository/users');

function authenticate() {

    function authorize(req, res, next) {
        if(req.session && req.session.user) {
            userRepository.getUserByEmail(req.session.user)
                .then(function(user) {
                    if(!user) res.redirect('/security');

                    delete user.password;
                    req.session.user = user.email;
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

    return {
        authorize: authorize
    }
}

module.exports = authenticate();