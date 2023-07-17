const { Events } = require('../models');

const eventsdata = [
    {
        name: "Nick",
        starting_date: "July 25, 2023 05:00:00",
        ending_date: "July 25, 2023 06:00:00",
        day: "tuesday",
    },
    {
        name: "Ben",
        starting_date: "July 25, 2023 07:00:00",
        ending_date: "July 25, 2023 08:00:00",
        day: "tuesday",
    },
    {
        name: "Brandon",
        starting_date: "July 25, 2023 09:00:00",
        ending_date: "June 25, 2023 10:00:00",
        day: "tuesday",
    },
    {
        name: "Nicco",
        starting_date: "July 25, 2023 11:00:00",
        ending_date: "July 25, 2023 12:00:00",
        day: "tuesday",
    }
];

const seedEvents = () => Events.bulkCreate(eventsdata);

module.exports(seedEvents);