const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

function UsersRepository() {

    const adapter = new FileAsync(process.env.DATABASE_FILE);

    function getUserByEmail(email) {
        const lowerEmail = email.toLowerCase();

        return low(adapter)
            .then(function(db) {
                const user = db.get('users')
                    .find({email: lowerEmail})
                    .value();

                return user;
            }) 
    }

    return {
        getUserByEmail: getUserByEmail
    }
}

module.exports = UsersRepository();