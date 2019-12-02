module.exports = function (sequelize, Sequelize) {
    let personalPlaylist = sequelize.define("personalPlaylist", {
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
        },
    });
    return personalPlaylist;
}; 