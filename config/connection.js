const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.SECRET,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
  }
);
