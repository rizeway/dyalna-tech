module.exports = function(sequelize, DataTypes) {
  var Maker = sequelize.define('Maker', {
    username: DataTypes.STRING,
    approved: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Maker.belongsTo(models.Project);
      }
    }
  });


  return Maker;
};
