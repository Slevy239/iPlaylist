$(document).ready(function () {

    //Get the username:
    //Get user info:
    $.get('/api/login', function (user) {
        //Display username:
        $("#userName").text(user.username);
    });

    //Grab all of the songs in the community playlist:
    $.get('/api/community', function (data) {
        console.log(data);
        makeCard(data);
    }).then(function () {
        vote();
    });

    //Logout
    $(document).on('click', "#logout", function () {
        $.get('/logout', function () {
            console.log('Logged out');
        }).then(function (data) {
            window.location.replace('/');
        });
    });

    function makeCard(data) {
        for (i = 0; i < data.length; i++) {
            console.log(data[i]);
            let cardBody1 = $("<div>").addClass("<card-body>").attr('id', i);
            let cardBody2 = $("<div>").addClass("<card-body>").attr('id', i);
            let artist = $("<h5>").addClass('card-title').attr('id', i);
            let dataList = $("<ul>").addClass('list-group list-group-flush').attr('id', i);
            let songTitle = $("<li>").addClass('list-group-item song').attr('id', i);
            let userAdded = $("<li>").addClass('list-group-item user').attr('id', i);
            let newCard = $("<div>").addClass("card").attr('id', i);
            let cardImg = $("<img>").addClass('card-img-top').attr('id', i);
            let vote = $("<div>").addClass("vote").attr('id', i);
            let createdAt = moment(data[i].createdAt, "YYYYMMDD").format('MMMM Do YYYY');

            userAdded.text("Added by " + data[i].username + " on " + createdAt);
            vote.append("<button id=" + data[i].id + " class= 'upvote'><i class='fa fa-thumbs-up'></i></button>");
            vote.append("<button id=" + data[i].id + " class= 'downvote'><i class='fa fa-thumbs-down'></i></button>");
            cardImg.attr('src', data[i].albumImg);
            cardBody1.append(artist.text(data[i].artistName));
            dataList.append(songTitle.text(data[i].songName));
            dataList.append('<button id=' + i + '><img class="playBtn" data-playing ="false" id=' + i + ' alt="playButton" src="https://cdn1.iconfinder.com/data/icons/line-arrow-hand-draw/64/arrow_hand_draw_line-25-512.png"></button>');
            dataList.attr('src', data[i].songLink);
            cardBody1.append(artist);
            cardBody1.append(songTitle);
            cardBody2.append(userAdded);
            newCard.append(cardImg, cardBody1, dataList, cardBody2, vote);

            $("#communityPlayList").append(newCard);

        }
        // call function to handle playing and pausing audio
        playSong(data);
    }
    //Tally the vote:
    function vote() {
        let num;
        $("button").on('click', function () {
            let vote = $(this).attr('class');
            let id = $(this).attr('id');
            if (vote === "upvote") {
                num = 1;
                update(num, id);
            } else if (vote === "downvote") {
                num = -1;
                update(num, id);
            }
        });
    }
    //Send the vote to the server:
    function update(num, id) {
        $.ajax({
            method: "PUT",
            url: "/api/community",
            data: {num: num,
            id: id}
          }).then(function (rowsUpdated) {
            res.json(rowsUpdated);
        });
    }

    // Play the song:
    function playSong(data) {
        let playAudio;
        $(".playBtn").on("click", function (event) {
            let idNum = $(this).attr('id');
            console.log(idNum);
            console.log(data[idNum].songLink);
            let isPlaying = $(this).attr('data-playing');
            if (isPlaying === 'false') {
                playAudio = new Audio(data[idNum].songLink);
                playAudio.play();
                $(this).attr('data-playing', 'true');
                $(this).attr('src', 'https://cdn1.iconfinder.com/data/icons/internet-28/48/12-512.png');
            } else {
                playAudio.pause();
                $(this).attr('data-playing', 'false');
                $(this).attr('src', 'https://cdn1.iconfinder.com/data/icons/line-arrow-hand-draw/64/arrow_hand_draw_line-25-512.png');
            }
        });
    }
});
