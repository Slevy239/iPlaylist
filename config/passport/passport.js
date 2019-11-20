const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../../models');

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function (email, password, done) {
        db.userCred.findOne({
            where: {
                email: email
            }
        }).then(function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect email'
                });
            } else if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
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