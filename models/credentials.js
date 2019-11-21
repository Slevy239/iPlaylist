const bcrypt = require('bcrypt');

module.exports = function (sequelize, Sequelize) {
    var userCred = sequelize.define("userCred", {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });
    //Compare hashed password to stored password:
    userCred.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    //Before a User is created, we will automatically hash their password
    userCred.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return userCred;
};