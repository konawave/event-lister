const Users = require('./users');
const Events = require('./events');

Users.hasMany(Events, {
  foreignKey: 'id',
});

Events.belongsTo(Users, {
  foreignKey: 'id',
});

module.exports = { Users, Events };