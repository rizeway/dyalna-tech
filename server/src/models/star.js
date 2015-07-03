module.exports = function(sequelize, DataTypes) {
  var Star = sequelize.define('Star', {
    staredAt: DataTypes.DATE,
    author: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Star.belongsTo(models.Project);
      }
    }
  });


  return Star;
};
