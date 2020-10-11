$(document).ready(function () {
    var socket = io(),
        $newCommentOnEvent = $('#new-comment-on-event'),
        $newCommentText = $('#new-comment-text');

    $newCommentOnEvent.submit(function (event) {
        event.preventDefault();

        socket.emit('new event comment', {
            newComment: $newCommentText.val(),
            eventId: location.pathname.substr(location.pathname.lastIndexOf('/') + 1)
        });

        socket.on('new event comment saved', function (event) {
            console.log(event);
        });

        $newCommentText.val('');
    });

});