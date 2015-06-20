module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    approved: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Project;
};
