const usersRepository = require('../repository/user.repository');
const md5 = require('md5');

function security() {
    function logon(email, password) {
        return new Promise(function (resolve, reject) {
            usersRepository.query({ email: email }, true)
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