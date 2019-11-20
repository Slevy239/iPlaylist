const db = require("../models");
const passport = require('../config/passport/passport');

module.exports = function (app) {
  //Route for initial user signup:
  app.post('/api/signup', function (req, res) {
    db.userCred.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect("/login");
    }).catch(function (err) {
      console.log(err);
      res.status(401).json(err);
    });
  });

  //Route for user login:
  app.post('/api/login', passport.authenticate("local"), function(req, res){
    res.json(req.user);
    res.redirect("/home");
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
