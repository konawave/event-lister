const { Events } = require('../models');

const eventsdata = [
    {
        eventName: "Nick",
        date: "2023-07-19",
    },
    {
        eventName: "Ben",
        date: "2023-07-19",
    },
    {
        eventName: "Brandon",
        date: "2023-07-19",
    },
    {
        eventName: "Nicco",
        date: "2023-07-24",
    }
];

const seedEvents = () => Events.bulkCreate(eventsdata);

module.exports = {
    seedEvents
}