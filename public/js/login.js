$(function () {
    //Set up some variables:
    let email = $("#email").val().trim();
    let password = $("#password").val().trim();

    //On submit, send over the email address and password supplied by the user and start authorization cascade:
    $("#subBtn").on('click', function (event) {
        event.preventDefault();
        console.log("Clicked");
        let user =
        {
            email: email,
            password: password
        };

        //Clear out
        email.val("");
        password.val("");

        //Send over the info
        $.post('/api/login', {
            email: user.email,
            password: user.password
        }).then(function(){
            window.location.replace("/home");
        }).catch(function(err){
            console.log(err);
        });
    });
});