$(document).ready(function() {

    $('#loginForm').submit(function(ev) {
        ev.preventDefault();

        const data = {
            useremail: $('[name="useremail"]').val(),
            password: $('[name="password"]').val()
        };

        $.post('/security', data)
            .then(function(result) {
                if(result.auth) {
                    localStorage.setItem('token', result.token);

                    if(result.redirect) {
                        window.location = result.redirect;
                    }
                }
            })
            .catch(function(error){
                $('#invalid').show();
            })
    });

});