$(document).ready(function () {
    //Get user info:
    $.get('/api/login', function (user) {
        //Display username:
        $("#userName").text(user.username);
    }).then(function (user) {
        // call function to load userPlayist to the page
        loadSavedCards(user.username);

        // //Run person search function
        $("#personSearch").click({ user: user }, function () {
            //Prevent reload on click:
            event.preventDefault();
            searchButton();
        });

        //Send selected song to personal playlist:
        personalClick(user);

        //Send selected song to community playlist:
        communityClick(user);

        //Delete card:
        $(document).on("click", ".delete", function () {
            let id = parseInt($(this).attr('id'));

            $.ajax({
                method: "DELETE",
                url: "/api/personal/" + id

            }).then(function (data) {

                $("#savedPlayList").empty();

                loadSavedCards(user.username);

            }).catch(function (err) {

                return err;
            });
        });

        //Logout
        $(document).on('click', "#logout", function () {
            $.get('/logout', function () {
            }).then(function (data) {
                window.location.replace('/login');
            });
        });

    });


    //Guts of personalClick function:
    function personalClick(user) {
        $(document).on('click', ".personal", function () {
            //User info:
            let username = user.username;
            let userId = user.id;
            //Extract needed info from card: 
            let id = this.id;
            let song = $(document.getElementById(id).getElementsByClassName("song")[0]).html();
            let artist = $(document.getElementById(id).getElementsByClassName("card-title")[0]).html();
            let url = $(document.getElementById(id).getElementsByClassName("list-group-flush")[0]).attr('src');
            let img = $(document.getElementById(id).getElementsByClassName("card-img-top")[0]).attr('src');

            let songData = {
                username: username,
                userid: userId,
                song: song,
                artist: artist,
                url: url,
                img: img
            };

            //Send songs to personal playlist DB:
            sendToPersonal(songData);
        });
    }

    //Guts of communityClick function:
    function communityClick(user) {

        $(document).on('click', ".community", function () {

            //User info:
            let username = user.username;
            let userId = user.id;
            //Extract needed info from card: 
            let id = this.id;
            let song = $(document.getElementById(id).getElementsByClassName("song")[0]).html();
            // let song = $(document.getElementsByClassName("song")[0]).html();
            let artist = $(document.getElementById(id).getElementsByClassName("card-title")[0]).html();
            let url = $(document.getElementById(id).getElementsByClassName("list-group-flush")[0]).attr('src');
            let img = $(document.getElementById(id).getElementsByClassName("card-img-top")[0]).attr('src');
            let songData = {
                username: username,
                userid: userId,
                song: song,
                artist: artist,
                url: url,
                img: img
            };

            //Send data to modal: 
            submitTag(songData);    
        });
    }
    
    function submitTag(data) {
        //Toggle modal:
        $("#commModal").modal('show');
        $('#tagSubmit').one('click', function(){
            let tag = $('#tagInput').val().trim();
            data.tag = tag;
            sendToCommunity(data);
            $('#commModal').modal('hide');
            });
    }

    //Search button click function
    function searchButton() {
        //Clear the card contents when search is conducted:
        $("#singlePlayList").empty();

        //Define our search term and hopefully hold it constant when the search bar is empty.
        let searchArr = [];
        if (!($('#userSearch').val().trim() === "")) {
            searchedString = $('#userSearch').val().trim();
        } else {
            searchArr.push(searchedString);
            searchedString = searchArr[0];
        }
        // initial deezer api call to grab the artist id related to the users searched string
        let deezer = {
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

        // reset search input form back to placeholder
        $("#userSearch").val("");
        $("#userSearch").attr("placeholder", "Search for an artist...");
    }

    //Search Deezer api for artist id:
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

            // create a blank object to be filled with random images, artist name, song title, mp3
            let tracksObj = {
                cover_img: "",
                artist_name: "",
                song_title: "",
                preview_url: ""
            };

            // loop through random array of length 5 and push object properties
            for (let i = 0; i < random_nums.length; i++) {

                tracksObj.cover_img = response.data[random_nums[i]].album.cover_medium;
                tracksObj.artist_name = response.data[random_nums[i]].artist.name;
                tracksObj.song_title = response.data[random_nums[i]].title;
                tracksObj.preview_url = response.data[random_nums[i]].preview;

                tracks.push(tracksObj);

                // resize trackObj back to empty
                tracksObj = {
                    cover_img: "",
                    artist_name: "",
                    song_title: "",
                    preview_url: ""
                };
            }

            // call function to create a list of 5 song cards
            CreateSongCard(tracks);
        });
    }

    //Dynamically create the song card:
    function CreateSongCard(Arr) {
        for (let i = 0; i < Arr.length; i++) {
            let cardBody1 = $("<div>").addClass("<card-body>").attr('id', i);
            let cardBody2 = $("<div>").addClass("<card-body>").attr('id', i);
            let artist = $("<h5>").addClass('card-title').attr('id', i);
            let dataList = $("<ul>").addClass('list-group list-group-flush').attr('id', i);
            let songTitle = $("<li>").addClass('list-group-item song').attr('id', i);
            let saveLink = $("<div>").addClass('personal').attr('id', i);
            let commLink = $("<div>").addClass('community').attr('id', i);
            let newCard = $("<div>").addClass("card").attr('id', i);
            let cardImg = $("<img>").addClass('card-img-top').attr('id', i);

            cardImg.attr('src', Arr[i].cover_img);
            cardBody1.append(artist.text(Arr[i].artist_name));
            dataList.append(songTitle.text(Arr[i].song_title));
            dataList.append('<button id=' + i + '><img class="playBtn" data-playing ="false" id=' + i + ' alt="playButton" src="https://cdn1.iconfinder.com/data/icons/line-arrow-hand-draw/64/arrow_hand_draw_line-25-512.png"></button>');
            dataList.attr('src', Arr[i].preview_url);
            cardBody1.append(artist);
            cardBody1.append(songTitle);
            cardBody2.append(saveLink, commLink);
            newCard.append(cardImg, cardBody1, dataList, cardBody2);

            saveLink.append('<img class="save-img" src="../images/save_link_img.png">');
            commLink.append('<img class="add-img" src="../images/add_img.png">');
            $("#singlePlayList").append(newCard);
        }

        // call function to handle playing and pausing audio
        playSong(Arr);
    }

    // Play the song:
    function playSong(Arr) {
        let playAudio;
        $(".playBtn").on("click", function (event) {
            //This id is coming from the card that is created.
            let idNum = $(this).attr('id');
            let isPlaying = $(this).attr('data-playing');
            if (isPlaying === 'false') {
                playAudio = new Audio(Arr[idNum].preview_url);
                playAudio.play();
                $(this).attr('data-playing', 'true');
                $(this).attr('src', '../images/pause_img.png');
            } else {
                playAudio.pause();
                $(this).attr('data-playing', 'false');
                $(this).attr('src', '../images/play_img.png');
            }
        });
    }

    //Post song to personal playlist:
    function sendToPersonal(obj) {
        $.post('/api/personal/:' + obj.username, {
            username: obj.username,
            userid: obj.userid,
            song: obj.song,
            artist: obj.artist,
            url: obj.url,
            img: obj.img
        }).then(function (data) {
            // Clear the current search items:
            $("#singlePlayList").empty();
            // call function to load userPlayist to the page
            loadSavedCards(data.username);
        }).catch(handleLoginErr);
    }

    //Post song to community playlist:
    function sendToCommunity(obj) {
        $.post('/api/community', {
            username: obj.username,
            userid: obj.userid,
            song: obj.song,
            artist: obj.artist,
            url: obj.url,
            img: obj.img,
            tags: obj.tag
        });
    }

    // function to load *saved cards to the personal html page
    function loadSavedCards(user) {
        $("#savedPlayList").empty();
        $.get("/api/personal/" + user, function (data) {
            for (let i = 0; i < data.length; i++) {
                let cardBody1 = $("<div>").addClass("<card-body>").attr('id', i);
                let cardBody2 = $("<div>").addClass("<card-body>").attr('id', i);
                let artist = $("<h5>").addClass('card-title').attr('id', i);
                let dataList = $("<ul>").addClass('list-group list-group-flush').attr('id', i);
                let songTitle = $("<li>").addClass('list-group-item song').attr('id', i);
                let delLink = $("<div>").addClass('delete').attr('id', data[i].id);
                let commLink = $("<div>").addClass('community').attr('id', i);
                let newCard = $("<div>").addClass("card").attr('id', i);
                let cardImg = $("<img>").addClass('card-img-top').attr('id', i);

                cardImg.attr('src', data[i].albumImg);
                cardBody1.append(artist.text(data[i].artistName));
                dataList.append(songTitle.text(data[i].songName));
                dataList.append('<button id=' + i + '><img class="playSavedSong" data-playing ="false" id=' + i + ' alt="playButton" src="https://cdn0.iconfinder.com/data/icons/controls-essential/48/v-02-512.png"></button>');
                dataList.attr('src', data[i].songLink);
                cardBody1.append(artist);
                cardBody1.append(songTitle);
                cardBody2.append(delLink, commLink);
                newCard.append(cardImg, cardBody1, dataList, cardBody2);

                delLink.append('<img class="del-img" src="../images/delete_img.png">');
                commLink.append('<img class="add-img" src="../images/add_img.png">');

                $("#savedPlayList").append(newCard);

            }

            playSavedSong(data);
            // Load more songs:
            searchButton();
        });

    }

    //Play song when play button is clicked, and also pause it.
    function playSavedSong(Arr) {
        let playAudio;
        $(".playSavedSong").on("click", function (event) {
            let idNum = $(this).attr('id');
            let isPlaying = $(this).attr('data-playing');
            if (isPlaying === 'false') {
                playAudio = new Audio(Arr[idNum].songLink);
                playAudio.play();
                $(this).attr('data-playing', 'true');
                $(this).attr('src', '../images/pause_img.png')
            } else {
                playAudio.pause();
                $(this).attr('data-playing', 'false');
                $(this).attr('src', '../images/play_img.png')
            }
        });
    }

    //Error handling
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
