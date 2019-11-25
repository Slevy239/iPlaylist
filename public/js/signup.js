$(function(){
    //Define some variables:
    let userName = $("#userNameInput");
    let email = $("#emailInput");
    let password = $("#pWordInput");

    $("#signUpBtn").on('click', function(event){
        event.preventDefault();
        let createUser = {
            email: email.val().trim(),
            password: password.val().trim(),
            username: userName.val().trim()
        };

        if (!createUser.usename) {
            $('#alert .msg').text("Hey you forgot to add a username!");
            return $("#alert").fadeIn(500);
        } else if (!createUser.email) {
            $('#alert .msg').text("Hey you forgot to add a email address!");
            return $("#alert").fadeIn(500);
        } else if (!createUser.password) {
             $('#alert .msg').text("Hey you forgot to add a password!");
             return $("#alert").fadeIn(500);
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
        }).then(function(data){
            window.location.replace("../html/project2.html");
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