$(function () {
    //On submit, send over the email address and password supplied by the user and start authorization cascade:
    $("#subBtn").on('click', function (event) {
        event.preventDefault();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        let user =
        {
            email: email,
            password: password
        };
        sendData(user.email, user.password);
    });

    function sendData(email, password) {
        $.post('/api/login', {
            email: email,
            password: password
        }).then(function() {
            window.location.replace("/project2.html");
        }).catch(handleLoginErr);
    };
    //Error handling
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
});