$(function(){
    //Define some variables:
    let signUp = $("form.signup");
    let email = $("input#emailInput");
    let password = $("input#pWordInput");

    signUp.on('click', function(event){
        event.preventDefault();
        console.log("Signed up!");
        let createUser = {
            email: email.val().trim(),
            passWord: password.val().trim()
        };

        if(!createUser.email || !createUser.passWord) {
            //May want to do a modal instead of an alert
            alert("Please enter a username and password.");
            return;
        }

        //Call the sign in function:
        signUpUser(createUser.email, createUser.passWord);
        //Clear out the inputs:
        email.val("");
        password.val("");
    });

    //Function to actually post our sing in info to our database:
    function signUpUser(email, password) {
        $.post("/api/signup", {
            email: email,       
            password: password
        }).then(function(data){
            //Double check that this is the right redirect location:
            window.location.replace("/project2");
        }).catch(handleLoginErr);
    }

    //Error handling function:
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
});