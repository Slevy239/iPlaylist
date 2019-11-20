$(function(){
    //Define some variables:
    let email = $("#emailInput");
    let password = $("#pWordInput");

    $("#subBtn").on('click', function(event){
        event.preventDefault();
        console.log("Signed up!");
        let createUser = {
            email: email.val().trim(),
            password: password.val().trim()
        };

        if (!createUser.email || !createUser.password) {
            return;
        }

        //Call the sign in function:
        signUpUser(createUser.email, createUser.password);
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
            console.log(data);
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