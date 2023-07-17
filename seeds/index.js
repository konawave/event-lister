const sequelize = require('../config/connection');
const seedEvents = require('./eventsDada');
const seedUsers = require('./usersData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedEvents();

  process.exit(0);
};

seedAll();
