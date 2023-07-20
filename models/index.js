const Users = require('./users');
const Events = require('./events');

Users.hasMany(Events);

Events.belongsTo(Users, {
  foreignKey: 'user_id',
});

module.exports = { Users, Events };