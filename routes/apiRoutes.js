const db = require("../models");
const passport = require('../config/passport/passport');

// spotify api dependencies
const Keys = require('../keys.js');
var Spotify = require('node-spotify-api');
const spotify = new Spotify(Keys.spotify);

module.exports = function (app) {
  // Get all examples
  app.post("/api/spotify/search", function (req, res) {

    let searchInfo = req.body.searchInfo;

    spotify

      .search({ type: 'track', query: searchInfo })

      .then(function (response) {

        console.log(response.tracks);

        let allTracks = response.tracks.items;

        let sortedTracks = allTracks.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));


        let sendArr = [];
        for (let i = 0; i < sortedTracks.length; i++) {
          sendArr.push(sortedTracks[i].external_urls);
        }
        res.json(sendArr);
      });
  });


  //Route for initial user signup:
  app.post('/api/signup', function (req, res) {
    db.userCred.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      console.log(err);
      res.status(401).json(err);
    });
  });

  //Route for user login:
  app.post('/api/login', passport.authenticate("local", {failureRedirect: '/', failureFlash: true }), function (req, res) {
    res.redirect('/home');
  });
  
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/api/login");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username
      });
    }
  });


};



