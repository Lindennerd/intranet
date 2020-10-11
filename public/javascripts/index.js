$(document).ready(function () {
    $('.sidenav').sidenav();

    io().on('chat message', function (msg) {
        console.log('new chat message');
    });

    io().on('new event comment', function (comment) {
        console.log('new event comment')
    })
});