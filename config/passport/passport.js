const bCrypt = require('bcrypt');

module.exports = function (passport, user) {
    let User = user;
    const LocalStrategy = require('passport-local');

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        },
        function (req, email, password, done) {
            const generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    let userPassword = generateHash(password);
                    let data =
                    {
                        email: email,
                        password: userPassword,
                        //Change this to be what you get from the front end;
                        firstname: req.body.firstname,
                        //Change this to be what you get from the front end;
                        lastname: req.body.lastname
                    };
                    //Does this need to refer to the model?
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
}