const db = require("../models");
const passport = require('../config/passport/passport');

// spotify api dependencies
const Keys = require('../keys.js');
var Spotify = require('node-spotify-api');
const spotify = new Spotify(Keys.spotify);

module.exports = function (app) {

  app.post("/api/deezer/search", function (req, res) {

    let searchInfo = req.body.searchInfo;

    // console.log(searchInfo);

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
  app.post('/api/login', passport.authenticate("local"), function (req, res) {
    res.json(req.user);
    });

  // Route for getting some data about our user to be used client side
  app.get('/api/login', function(req, res){
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

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/api/login");
  });

  //Api route for sending song info to personal playlist database:
  //Need to add username:
  app.post("/api/personal", function(req, res){
    db.personalPlaylist.create({
      username: req.body.username,
      userid: req.body.userid,
      artistName: req.body.artist,
      songName: req.body.song,
      songLink: req.body.url,
      albumImg: req.body.img
    }).then(function(data){
      res.json(data);
    }).catch(function (err) {
      console.log(err);
      res.status(401).json(err);
    });
  });

  //Api route for sending song info to community playlist database:
  //Need to add username:
  app.post("/api/community", function(req, res){
    db.communityPlaylist.create({
      username: req.body.username,
      userid: req.body.userid,
      artistName: req.body.artist,
      songName: req.body.song,
      songLink: req.body.url,
      albumImg: req.body.img
    }).then(function(data){
      res.json(data);
    }).catch(function (err) {
      console.log(err);
      res.status(401).json(err);
    });
  });

  app.get("/api/personal", function(req, res){

    db.personalPlaylist.findAll({}).then(function(data){

      res.json(data);
      
      console.log(data);
      

    }).catch(function (err) {

      console.log(err);
      // res.status(401).json(err);
    })

  })
};



