const { Users } = require('../models');

const usersdata = [
    {
        name: "Nick",
        password: "password"
    },
    {
        name: "Ben",
        password: "password"
    },
    {
        name: "Brandon",
        password: "password"
    },
    {
        name: "Nicco",
        password: "password"
    }
];

const seedUsers = () => Users.bulkCreate(usersdata);

module.exports = {
    seedUsers
}