var mongoose = require('mongoose');

module.exports = (function () {
    return {
        connect: function () {
            mongoose.connect(process.env.ENVIRONMENT === 'DEV'
                ? process.env.DATABASE_DEV : process.env.DATABASE_PROD, { useNewUrlParser: true });

            mongoose.connection.on('error', console.error.bind(console, 'connection error'));
            mongoose.connection.once('open', function () {
                console.log('we\'re connected');
            });

            return mongoose.connection;
        }
    }
})();