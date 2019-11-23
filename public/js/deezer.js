



$("#personSearch").on("click", function () {
    event.preventDefault();

    console.log("clicked");

    var searchedString = $('#userSearch').val().trim();

    if (searchedString === "") {

        searchedString = "eminem";

    }

    console.log(searchedString)
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
            "url": "https://deezerdevs-deezer.p.rapidapi.com/artist/" + artistID + "/top?limit=50",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "93bb26cc96msh4a3826e7173d4dep100250jsn2e5da9455e0c"
            }
        }

        $.ajax(settings).done(function (response) {

            /* console.log(response.data);

            // atrist album image
            console.log(response.data[0].album.cover_medium);

            // artist name
            console.log(response.data[0].artist.name);

            // song title
            console.log(response.data[0].title);

            // preview url
            console.log(response.data[0].preview); */


            // generate 5 random numbers: instant playlists will be of length 10
            let random_nums = []
            for (let i = 0; i < 5; i++) {

                random_nums.push(Math.floor(Math.random() * 50));
                

            }

            console.log(random_nums);

            // grab 5 random mp3s to display playlist
            let tracks = [];
            
            let tracksObj = {

                cover_img: "",
                artist_name: "",
                song_title: "",
                preview_url: ""

            }

            for (let i = 0; i < random_nums.length; i++) {

                tracksObj.cover_img = response.data[random_nums[i]].album.cover_medium;
                tracksObj.artist_name = response.data[random_nums[i]].artist.name;
                tracksObj.song_title = response.data[random_nums[i]].title;
                tracksObj.preview_url = response.data[random_nums[i]].preview

                tracks.push(tracksObj);
                
                tracksObj = {

                    cover_img: "",
                    artist_name: "",
                    song_title: "",
                    preview_url: ""
    
                }

            }

            // array of objects to be displayed in a card
            // console.log(tracks);
            
    
            CreateSongCard(tracks);

        });

    }



})



function CreateSongCard (Arr) {

    console.log(Arr)

    for (let i = 0; i < Arr.length; i++) {

        let newCard = $("")


    }


}



function deezerPostObj(dataObj) {

    // console.log(dataObj);

    $.post("/api/deezer/search", {
        searchInfo: dataObj

    }).then(function (data) {
        // console.log(data);

    });

}