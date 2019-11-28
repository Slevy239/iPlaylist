const db = require("../models");
const passport = require('../config/passport/passport');


module.exports = function (app) {

  //Send users to the login page right away:
  app.get('/', function(req, res){
    res.redirect('/login');
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
      res.status(401).json(err);
    });
  });

  //Route for user login:
  app.post('/api/login', passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/login', function (req, res) {
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
    res.redirect("/login");
  });

  //Api route for sending song info to personal playlist database:
  app.post("/api/personal/:user", function (req, res) {
    db.personalPlaylist.create({
      username: req.body.username,
      userid: req.body.userid,
      artistName: req.body.artist,
      songName: req.body.song,
      songLink: req.body.url,
      albumImg: req.body.img
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });

  //Api route to grab stuff from Community
  app.get('/api/community', function (req, res) {
    db.communityPlaylist.findAll({
    }).then(function (data) {
      res.json(data);
    });
  });

  //Api route for sending song info to community playlist database:
  //Need to add username:
  app.post("/api/community", function (req, res) {
    db.communityPlaylist.create({
      username: req.body.username,
      userid: req.body.userid,
      artistName: req.body.artist,
      songName: req.body.song,
      songLink: req.body.url,
      albumImg: req.body.img
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });

  // route for getting all rows in database
  // synonymous to SELECT * FROM some_db
  app.get("/api/personal/:user", function (req, res) {
    db.personalPlaylist.findAll({
      where: {
        username: req.params.user
      }
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      return err;
    });
  });

  // delete specific id from database
  app.delete("/api/personal/:id", function (req, res) {
    let id = req.params.id;
    db.personalPlaylist.destroy({
      where: {
        id: id
      }
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      return err;
    });
  });


  //Update the votes:
  app.put('/api/community', function (req, res) {
    db.communityPlaylist.update(
      { votes: db.sequelize.literal('votes + ' + req.body.num) },
      { where: { id: req.body.id } }
    );
  });

};

