




$('#submitbtn').on('click', function () {

    event.preventDefault();

    var searchedString = $('.userSearch').val().trim();

    console.log(searchedString);


    $.post("/api/spotify/search", {
        searchInfo: searchedString

    }).then(function (data) {
        console.log(data);

    });







})



$("#instaPlay").on("click", function () {
    event.preventDefault();

    console.log("clicked");

    var searchedString = $('.userSearch').val().trim();

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
        console.log(response.data[0]);

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
            console.log(response);

            // initial list of 50 preview mp3s
            let preview_mp3s = [];
            for (let i = 0; i < response.data.length; i++) {
                preview_mp3s.push(response.data[i].preview);
            }

            // generate 10 random numbers: instant playlists will be of length 10
            let random_nums = []
            for (let i = 0; i < 5; i++) {

                random_nums.push(Math.floor(Math.random() * 50));

            }

            // grab 10 random mp3s to display playlist
            let random_mp3s = [];
            for (let i = 0; i < random_nums.length; i++) {
                random_mp3s.push(response.data[random_nums[i]].preview);
            }

            // console.log(random_mp3s);

            CreateInstantPlaylist(random_mp3s);

        });

    }



})

function CreateMiniPlayer (){




}



function CreateInstantPlaylist (Arr) {

    console.log(Arr)

    for (let i = 0; i < Arr.length; i++) {

        let newDiv = $("<div class=playlist-track-"+i+">");

        // newDiv.append("<a href="+Arr[i]+">");

        $(".instantPlaylist").append(newDiv);

        $(newDiv).append("<embed src="+Arr[i]+" type=audio/mp3 autostart=0>");


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