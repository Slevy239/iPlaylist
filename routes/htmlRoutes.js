const db = require("../models");
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  //Load the signup page:
  app.get('/login', function (req, res) {
    if (req.user) {
      res.redirect("/home");
    }
    res.render('login');
  });

  //Load home page: 
  app.get('/home', isAuthenticated, function (req, res) {
    res.render('index');
  });

  //Load Community page:
  app.get('/community', function (req, res) {
    db.communityPlaylist.findAll({
      order: [
        ['votes', 'DESC']
      ]
    }).then(function (data) {
      let playlist = {
        song: data
      };
      res.render('community', playlist);
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });
};
