




$('#submitbtn').on('click', function () {

    event.preventDefault();

    var searchedString = $('.userSearch').val().trim();

    /* console.log(searchedString);


    $.post("/api/spotify/search", {
        searchInfo: searchedString       

    }).then(function(data){
        console.log(data);
        
    }); */






    // initial deezer api call to grab the artist id related to the users searched string
    var deezer = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchedString,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "93bb26cc96msh4a3826e7173d4dep100250jsn2e5da9455e0c"
        }
    }

    $.ajax(deezer).done(function (response) {
        // console.log(response.data[0]);

        let artist_id = response.data[0].artist.id;

        artistFunc(artist_id);

        // deezerPostObj(response.data[0]);

    });

    function artistFunc(artistID) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://deezerdevs-deezer.p.rapidapi.com/artist/" + artistID +"/top?limit=50",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "93bb26cc96msh4a3826e7173d4dep100250jsn2e5da9455e0c"
            }
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response);

            // initial list of 50 preview mp3s
            let preview_mp3s = [];
            for (let i = 0; i < response.data.length; i++) {
                preview_mp3s.push(response.data[i].preview);
            }

            // generate 10 random numbers: instant playlists will be of length 10
            let random_nums = []
            for (let i = 0; i < 10; i++) {

                random_nums.push(Math.floor(Math.random() * 50));

            }

            // grab 10 random mp3s to display playlist
            let random_mp3s = [];
            for (let i = 0; i < random_nums.length; i++) {
                random_mp3s.push(response.data[random_nums[i]].preview);
            }

            console.log(random_mp3s);
            
        });

    }


    function deezerPostObj(dataObj) {

        // console.log(dataObj);

        $.post("/api/deezer/search", {
            searchInfo: dataObj

        }).then(function (data) {
            // console.log(data);

        });

    }


})

