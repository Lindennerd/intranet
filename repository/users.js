const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

function UsersRepository() {

    const adapter = new FileAsync(process.env.DATABASE_FILE);

    function getByUserName(username) {
        const lowerUserName = username.toLowerCase();

        return low(adapter)
            .then(function(db) {
                const user = db.get('users')
                    .find({username: lowerUserName})
                    .value();

                return user;
            }) 
    }

    return {
        getByUserName: getByUserName
    }
}

module.exports = UsersRepository();