const { Users } = require('../models');

const usersdata = [
    {
        username: "Nick",
        password: "password"
    },
    {
        username: "Ben",
        password: "password"
    },
    {
        username: "Brandon",
        password: "password"
    },
    {
        username: "Nicco",
        password: "password"
    }
];

const seedUsers = () => Users.bulkCreate(usersdata);

module.exports = {
    seedUsers
}