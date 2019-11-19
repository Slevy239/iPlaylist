module.exports = function (sequelize, Sequelize) {
    var userCred = sequelize.define("userCred", {
        userName: {
            type: Sequelize.TEXT, allowNull: false, validate: {
                len: [4, 50]
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING, allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });
  return userCred;
        };