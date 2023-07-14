const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Monday extends Model {}

Monday.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starting_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ending_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'monday',
  }
);

module.exports = Monday;