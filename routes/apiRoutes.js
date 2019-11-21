const db = require("../models");
const passport = require('../config/passport/passport');

// spotify api dependencies
const Keys = require('../keys.js');
var Spotify = require('../node_modules/node-spotify-api');
const spotify = new Spotify(Keys.spotify);

module.exports = function (app) {
  // Get all examples
  app.get("/api/spotify/search/:id", function (req, res) {

    let id = req.params.id;

    console.log(id);

    spotify

      .search({ type: 'track', query: id })

      .then(function (response) {

        var artistName = response.tracks.items[0].artists[0].name;
        var songName = response.tracks.items[0].name;
        var songLink = response.tracks.items[0].external_urls.spotify;
        var albumLink = response.tracks.items[0].album.external_urls.spotify;

        console.log('\n');
        console.log('-------------------------------------------------');
        console.log(' Artist: ' + artistName.toUpperCase());
        console.log('-------------------------------------------------');
        console.log('  Song: ' + songName);
        console.log('  Link to song: ' + songLink);
        console.log('  Link to album: ' + albumLink);
        console.log('\n');


      })



  });

  //Route for initial user signup:
  app.post('/api/signup', function (req, res) {
    db.userCred.create({
      email: req.body.email,
      password: req.body.password
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      console.log(err);
      res.status(401).json(err);
    });
  });

  //Route for user login:
  app.post('/api/login', passport.authenticate("local"), function(req, res){
    res.json(req.user);
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/api/login");
  });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
          email: req.user.email,
          id: req.user.id
        });
      }
    });


};



