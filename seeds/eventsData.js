const { Events } = require('../models');

const eventsdata = [
    {
        name: "Nick",
        eventName: "Soccer Practice",
        date: "2023-07-20",
    },
    {
        name: "Ben",
        eventName: "Tuba lessons",
        date: "2023-07-20",
    },
    {
        name: "Brandon",
        eventName: "AC/DC Concert",
        date: "2023-07-22",
    },
    {
        name: "Nicco",
        eventName: "Star Wars Movie Premiere",
        date: "2023-07-21",
    }
];

const seedEvents = () => Events.bulkCreate(eventsdata);

module.exports = {
    seedEvents
}