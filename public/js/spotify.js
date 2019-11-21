




$('#submitbtn').on('click', function(){
    
    event.preventDefault();

    var searchedString = $('#question').val().trim();

    $.post("/api/spotify/search/", { id: searchedString })


})

    