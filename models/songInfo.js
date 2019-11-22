module.exports = function (sequelize, Sequelize) {
    let songInfo = sequelize.define("songInfo", {
        artistName: {
            type: Sequelize.STRING
        },
        songName: {
            type: Sequelize.STRING
        },
        songLink: {
            type: Sequelize.STRING
        },
        albumLink: {
            type: Sequelize.STRING
        }
    });
    return songInfo;
}; 