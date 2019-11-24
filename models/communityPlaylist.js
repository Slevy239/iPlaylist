module.exports = function (sequelize, Sequelize) {
    let communityPlaylist = sequelize.define("communityPlaylist", {
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
        },
        userName: {
            type: Sequelize.STRING
        }
    });
    return communityPlaylist;
}; 