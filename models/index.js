const Users = require('./users');
const Events = require('./events');

Users.hasMany(Events, {
  foreignKey: 'users.id',
});

Events.belongsTo(Users, {
  foreignKey: 'users.id',
});

module.exports = { Users, Events };