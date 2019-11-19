$(function () {
    //Set up some variables:
    let logIn = $("form.login");
    let email = $("#email").val().trim();
    let password = $("#password").val().trim();

    //On submit, send over the email address and password supplied by the user and start authorization cascade:
    logIn.on('click', function (event) {
        event.preventDefault();
        console.log("Clicked");
        let user =
        {
            email: email,
            passWord: password
        };
        //Send over the info
        $.post()
    });



});