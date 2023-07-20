const { Events } = require('../models');

const eventsdata = [
    {
        eventName: "Nick",
        date: "2023-07-20",
    },
    {
        eventName: "Ben",
        date: "2023-07-20",
    },
    {
        eventName: "Brandon",
        date: "2023-07-22",
    },
    {
        eventName: "Nicco",
        date: "2023-07-21",
    }
];

const seedEvents = () => Events.bulkCreate(eventsdata);

module.exports = {
    seedEvents
}