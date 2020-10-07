// for dev

// SECRET=f2088763-d8e2-4949-94c6-beecf7cb5e00
// DATABASE=mongodb+srv://admin:admin@cluster0.hq9kh.mongodb.net/intranet?retryWrites=true&w=majority

var mongoose = require('mongoose');

module.exports = (function() {
    return {
        connect: function() {
            mongoose.connect(process.env.DATABASE,  { useNewUrlParser: true });

            mongoose.connection.on('error', console.error.bind(console, 'connection error'));
            mongoose.connection.once('open', function() {
                console.log('we\'re connected');
            });

            return mongoose.connection;
        }
    }
})();