const usersRepository = require('../repository/models/user.model');
const md5 = require('md5');

function security() {
    function logon(email, password) {
        return new Promise(function (resolve, reject) {
            usersRepository.findOne({ email: email }).lean().exec()
                .then(function (user) {
                    if (!user) reject();

                    if (user.password === md5(password)) {
                        resolve(user.id);
                    } else {
                        reject();
                    }
                })
                .catch(function () {
                    reject();
                })
        });
    }

    return {
        logon: logon
    }
}

module.exports = security();