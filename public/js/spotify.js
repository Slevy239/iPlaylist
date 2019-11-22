




$('#submitbtn').on('click', function(){
    
    event.preventDefault();

    var searchedString = $('.userSearch').val().trim();

    console.log(searchedString);


    $.post("/api/spotify/search", {
        searchInfo: searchedString       

    }).then(function(data){
        console.log(data);
        
    });

})

    