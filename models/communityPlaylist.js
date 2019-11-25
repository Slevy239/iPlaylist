module.exports = function (sequelize, Sequelize) {
    let communityPlaylist = sequelize.define("communityPlaylist", {
        username: {
            type: Sequelize.STRING
        },
        userid: {
            type: Sequelize.INTEGER
        },
        artistName: {
            type: Sequelize.STRING
        },
        songName: {
            type: Sequelize.STRING
        },
        songLink: {
            type: Sequelize.STRING
        },
        albumImg: {
            type: Sequelize.STRING
        }
    });
    return communityPlaylist;
}; 