module.exports = function (sequelize, Sequelize) {
    let personalPlaylist = sequelize.define("personalPlaylist", {
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
    return personalPlaylist;
}; 