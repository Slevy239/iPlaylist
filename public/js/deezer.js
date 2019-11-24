$("#personSearch").on("click", function () {
    //Prevent reload on click:
    event.preventDefault();
    //Clear the card contents when search is conducted:
    $("#singlePlayList").empty();

    var searchedString = $('#userSearch').val().trim();

    if (searchedString === "") {

        searchedString = "eminem";

    }
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
    };

    $.ajax(deezer).done(function (response) {

        let artist_id = response.data[0].artist.id;

        artistFunc(artist_id);
    });
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
        // generate 5 random numbers: instant playlists will be of length 10
        let random_nums = [];
        for (let i = 0; i < 5; i++) {
            random_nums.push(Math.floor(Math.random() * response.data.length));
        }

        // grab 5 random mp3s to display playlist
        let tracks = [];

        let tracksObj = {
            cover_img: "",
            artist_name: "",
            song_title: "",
            preview_url: ""
        };

        for (let i = 0; i < random_nums.length; i++) {

            tracksObj.cover_img = response.data[random_nums[i]].album.cover_medium;
            tracksObj.artist_name = response.data[random_nums[i]].artist.name;
            tracksObj.song_title = response.data[random_nums[i]].title;
            tracksObj.preview_url = response.data[random_nums[i]].preview;

            tracks.push(tracksObj);

            tracksObj = {
                cover_img: "",
                artist_name: "",
                song_title: "",
                preview_url: ""
            };
        }
        CreateSongCard(tracks);
    });
}

function CreateSongCard(Arr) {
    for (let i = 0; i < Arr.length; i++) {
        let cardBody1 = $("<div>").addClass("<card-body>").attr('id', i);
        let cardBody2 = $("<div>").addClass("<card-body>").attr('id', i);
        let artist = $("<h5>").addClass('card-title').attr('id', i);
        let dataList = $("<ul>").addClass('list-group list-group-flush').attr('id', i);
        let songTitle = $("<li>").addClass('list-group-item song').attr('id', i);
        let prevURL = $("<li>").addClass('list-group-item url').attr('id', i);
        let saveLink = $("<button>").addClass('btn rounded bg-dark text-white card-link personal').attr('id', i).text("Save to my list.");
        let commLink = $("<button>").addClass('btn rounded bg-dark text-white card-link community').attr('id', i).text("Save to community list.");
        let newCard = $("<div>").addClass("card").attr('id', i);
        let cardImg = $("<img>").addClass('card-img-top').attr('id', i);

        cardImg.attr('src', Arr[i].cover_img);
        cardBody1.append(artist.text(Arr[i].artist_name));
        dataList.append(songTitle.text(Arr[i].song_title));
        dataList.append(prevURL.text(Arr[i].preview_url));
        cardBody1.append(artist);
        cardBody2.append(saveLink, commLink);
        newCard.append(cardImg, cardBody1, dataList, cardBody2);
        $("#singlePlayList").append(newCard);

    }
}

function deezerPostObj(dataObj) {

    $.post("/api/deezer/search", {
        searchInfo: dataObj

    }).then(function (data) {

    });
}

//Send selected song to personal playlist:
$(document).on("click", ".personal", function () {
    //Extract needed info from card: 
    let id = this.id;
    let song = $(document.getElementById(id).getElementsByClassName("song")[0]).html();
    let artist = $(document.getElementById(id).getElementsByClassName("card-title")[0]).html();
    let url = $(document.getElementById(id).getElementsByClassName("url")[0]).html();
    let img = $(document.getElementById(id).getElementsByClassName("card-img-top")[0]).attr('src');

    let songData = {
        song: song,
        artist: artist,
        url: url,
        img: img
    };

    sendToPersonal(songData);
});

//Send selected song to community playlist:
$(document).on("click", ".community", function () {
    //Extract needed info from card: 
    let id = this.id;
    let song = $(document.getElementById(id).getElementsByClassName("song")[0]).html();
    let artist = $(document.getElementById(id).getElementsByClassName("card-title")[0]).html();
    let url = $(document.getElementById(id).getElementsByClassName("url")[0]).html();
    let img = $(document.getElementById(id).getElementsByClassName("card-img-top")[0]).attr('src');

    let songData = {
        song: song,
        artist: artist,
        url: url,
        img: img
    };

    sendToCommunity(songData);
});

//Need to send over username:
//Post song to personal playlist:
function sendToPersonal(obj) {
    $.post('/api/personal', {
        song: obj.song,
        artist: obj.artist,
        url: obj.url,
        img: obj.img
    }).then(function (data) {
        console.log(data);
    }).catch(handleLoginErr);
}

//Post song to community playlist:
function sendToCommunity(obj) {
    $.post('/api/community', {
        song: obj.song,
        artist: obj.artist,
        url: obj.url,
        img: obj.img
    }).then(function (data) {
        console.log(data);
    }).catch(handleLoginErr);
}

//Error handling
function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}