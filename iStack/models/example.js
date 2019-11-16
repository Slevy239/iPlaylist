module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("query", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
