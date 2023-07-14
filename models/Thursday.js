const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Thursday extends Model {}

Thursday.init(
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
    modelName: 'thursday',
  }
);

module.exports = Thursday;