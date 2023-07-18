const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { startOfToday, endOfDay, addDays } = require("date-fns")

class Events extends Model {}

Events.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'events',
  }
);

module.exports = Events;