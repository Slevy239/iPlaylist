$(document).ready(function () {

    //Get the username:
    //Get user info:
    $.get('/api/login', function (user) {
        //Display username:
        $("#userName").text(user.username);
    });

    //Grab all of the songs in the community playlist:
    $.get('/api/community', function (data) {
        makeCard(data);
    });

    function makeCard(data) {
        for (i = 0; i < data.length; i++){
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
            vote.append("<button id=" + i + 'class= "upvote" <i class="fa fa-thumbs-up"></i></button>');
            vote.append("<button id=" + i + 'class= "downvote" <i class="fa fa-thumbs-down"></i></button>');
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
    }


});
