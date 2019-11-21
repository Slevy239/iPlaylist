const db = require("../models");
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //Load the signup page:
  app.get('/', function(req, res){
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });
  //Load login page, this will do Passport authorization:
  app.get('/login', function(req, res){
    if (req.user) {
      res.redirect('/home');
    }
    res.sendFile(path.join(__dirname, '../public/html/landing.html'));
  });
  //Load home page: 
  app.get('/home', isAuthenticated, function(req, res){
    res.sendFile(path.join(__dirname, '../public/html/project2.html'));
  });

};
