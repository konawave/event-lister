const { Events } = require('../models');

const eventsdata = [
    {
        eventName: "Nick",
        date: 2023-12-12,
    },
    {
        eventName: "Ben",
        date: 2023-12-12,
    },
    {
        eventName: "Brandon",
        date: 2023-12-12,
    },
    {
        eventName: "Nicco",
        date: 2023-12-12,
    }
];

const seedEvents = () => Events.bulkCreate(eventsdata);

module.exports = {
    seedEvents
}