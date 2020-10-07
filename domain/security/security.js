const usersRepository = require('../../repository/users');
const md5 = require('md5');

function security() {
    function logon(email, password) {
        return new Promise(function(resolve, reject){
            usersRepository.getUserByEmail(email)
                .then(function(user) {
                    if(!user) reject();

                    if(user.password === md5(password)) {
                        resolve(user.email);
                    } else {
                        reject();
                    }
                })
                .catch(function() {
                    reject();
                })
        });
    }

    return {
        logon: logon
    }
}

module.exports = security();