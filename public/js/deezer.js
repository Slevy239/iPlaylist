



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



function CreateSongCard(Arr) {
    for (let i = 0; i < Arr.length; i++) {
        let cardBody1 = $("<div>").addClass("<card-body>");
        let cardBody2 = $("<div>").addClass("<card-body>");
        let title = $("<h5>").addClass('card-title');
        let dataList = $("<ul>").addClass('list-group list-group-flush');
        let songTitle = $("<li>").addClass('list-group-item');
        let prevURL = $("<li>").addClass('list-group-item');
        let saveLink = $("<a>").addClass('card-link').text("Save to my list.");
        let commLink = $("<a>").addClass('card-link').text("Save to community list.");
        let newCard = $("<div>").addClass("card");
        let cardImg = $("<img>").addClass('card-img-top');

        newCard.attr("id", i);
        cardImg.attr('src', Arr[i].cover_img);
        commLink.attr('id', i);
        saveLink.attr('id', i);
        cardBody1.append(title.text(Arr[i].artist_name));
        dataList.append(songTitle.text(Arr[i].song_title));
        dataList.append(prevURL.text(Arr[i].preview_url));
        cardBody1.append(title);
        cardBody2.append(saveLink, commLink);
        newCard.append(cardImg, cardBody1, dataList, cardBody2);
        $("#singlePlayList").append(newCard);

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