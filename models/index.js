const Users = require('./Users');
const Events = require('./Events');

Users.hasMany(Events, {
  foreignKey: 'users.id',
});

Events.belongsTo(Users, {
  foreignKey: 'users.id',
});

module.exports = { Users, Events };