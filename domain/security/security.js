const usersRepository = require('../../repository/users');
const md5 = require('md5');

function security() {
    function logon(username, password) {
        return new Promise(function(resolve, reject){
            usersRepository.getByUserName(username)
                .then(function(user) {
                    if(!user) reject();

                    if(user.password === md5(password)) {
                        resolve(user.username);
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