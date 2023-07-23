const { Events } = require('../models');

const eventsdata = [
    {
        name: "Nick",
        eventName: "Recailbrating the TARDIS",
        date: "2023-07-20",
    },
    {
        name: "Ben",
        eventName: "Beaming up Group 2's presentation",
        date: "2023-07-20",
    },
    {
        name: "Brandon",
        eventName: "Walking to Mordor",
        date: "2023-07-22",
    },
    {
        name: "Nicco",
        eventName: "Infiltrating the Death Star",
        date: "2023-07-21",
    }
];

const seedEvents = () => Events.bulkCreate(eventsdata);

module.exports = {
    seedEvents
}