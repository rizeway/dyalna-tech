module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    approved: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Project.hasMany(models.Star);
        Project.hasMany(models.Maker);
      }
    }
  });
  return Project;
};
