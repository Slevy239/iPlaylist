$(function(){
    //Define some variables:
    let userName = $("#userNameInput");
    let email = $("#emailInput");
    let password = $("#pWordInput");

    $("#subBtn").on('click', function(event){
        event.preventDefault();
        let createUser = {
            email: email.val().trim(),
            password: password.val().trim(),
            username: userName.val().trim()
        };

        if (!createUser.email) {
            return $('#alert .msg').text("Hey you forgot to add an email address!");
        } else if (!createUser.password){
            return $('#alert .msg').text("Hey you forgot to add a password!");
        } else if (!createUser.username) {
            return $('#alert .msg').text("Hey you forgot to add a username!");
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
            console.log(data);
            //Double check that this is the right redirect location:
            window.location.replace("../html/project2.html");
        }).catch(handleLoginErr);
    }

    //Error handling function:
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
});