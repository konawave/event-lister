const { Users } = require('../models');

const usersdata = [
    {
        name: "Nick",
    },
    {
        name: "Ben",
    },
    {
        name: "Brandon",
    },
    {
        name: "Nicco",
    }
];

const seedUsers = () => Users.bulkCreate(usersdata);

module.exports(seedUsers);