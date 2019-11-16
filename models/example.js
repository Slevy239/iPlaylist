module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("query", {
    question: DataTypes.STRING,
    answer: DataTypes.TEXT,
    CreatedAt: DataTypes.DATE
  });
  return Example;
};
