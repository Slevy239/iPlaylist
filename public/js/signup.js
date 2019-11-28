$(function () {
    //Define some variables:
    let userName = $("#userNameInput");
    let email = $("#emailInput");
    let password = $("#pWordInput");

    $("#signUpBtn").on('click', function (event) {
        event.preventDefault();
        let createUser = {
            email: email.val().trim(),
            password: password.val().trim(),
            username: userName.val().trim()
        };

        if (!createUser.username) {
            $('#alert .msg').text("Hey you forgot to add a username!");
            $("#alert").fadeIn(500);
            userName.val("");
            return; 
        } else if (!createUser.email) {
            $('#alert .msg').text("Hey you forgot to add a email address!");
            $("#alert").fadeIn(500);
            email.val("");
            return;
        } else if (!createUser.password) {
            $('#alert .msg').text("Hey you forgot to add a password!");
            $("#alert").fadeIn(500);
            password.val("");
            return;
        }

        //Call the sign in function:
        signUpUser(createUser.email, createUser.password, createUser.username);
        //Clear out the inputs:
        email.val("");
        password.val("");
        userName.val("");
    });

    //Function to actually post our sing in info to our database:
    function signUpUser(email, password, username) {
        $.post("/api/signup", {
            email: email,
            password: password,
            username: username
        }).then(function (data) {
            window.location.replace("/home");
        }).catch(handleLoginErr);
    }

    //Error handling function:
    function handleLoginErr(err) {
        if (err.responseJSON.errors[0].message === 'Validation isEmail on email failed') {
            $("#alert .msg").text('Please enter a valid email address.');
        }
        $("#alert").fadeIn(500);
    }
});