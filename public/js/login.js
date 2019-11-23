$(function () {
    //On submit, send over the username and password supplied by the user and start authorization cascade:
    $("#subBtn").on('click', function (event) {
        event.preventDefault();
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();
        let user =
        {
            username: username,
            password: password
        };
        sendData(user.username, user.password);
    });

    function sendData(username, password) {
        $.post('/api/login', {
            username: username,
            password: password
        })

        .then(function(data) {
            window.location.replace('/home');
        }).catch(handleLoginErr);
    }
    //Error handling
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
});