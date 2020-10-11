const eventDomain = require('../domain/event');

module.exports = function (server) {
    return {
        listen: function (socket) {
            socket.on('new event comment', async function (newComment) {
                const event = await eventDomain.addComment(newComment, socket.request.session.user);
                server.emit('new event comment saved', event);
            })
        }
    }
}