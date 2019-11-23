const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../../models');

passport.use('local', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        console.log("Is this happening?");
        db.userCred.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            //If the user enters the wrong username:
            if (!user) {
                return done(null, false, {message: 'Username not found.'});
            //If the user enter the wrong password:
            } else if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;