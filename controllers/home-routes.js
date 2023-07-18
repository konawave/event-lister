
const router = require('express').Router();
const { Users, Events } = require('../../models');
const [ Op ] = require("sequelize")
const { startOfToday, endOfDay, addDays } = require("date-fns")

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const calUserData = await user.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(calUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const calUserData = await user.findOne({
            where: {
                username: req.body.username
            },
        });

        if (!calUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await calUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect User name or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: calUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// User's page
// router.get('/user/:userId', async (req, res) => {
//     // Get the user and associated events
//     const user = await Users.findOne({
//         where: {
//             id: req.params.userId
//         },
//         include: [Events]
//     })

// })
router.route("/calendar", async (req, res) => {
    try {
        const today = startOfToday();
        const endDay = endOfDay(addDays(new Date(), 6));
        const events = await Events.findAll({
            where: {
                date: {
                    [Op.between]: [today, endDay]
                }
            }
        })
        // Make an array of the 7 dates in object form
        // {
            // date: Date,
            // dayOfWeek: dayofweek,
            // events: [array of events]
        // }
        const dates = [
            // weekdays = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];
        {
            date: today,
            // getDay(2023, 7, 25)
            // Mon Oct 6 2014 00:00:00
            dayofweek: today[0],
            events: []
        },
        {
            date: startOfToday(addDays(new Date(), 1)),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: startOfToday(addDays(new Date(), 2)),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: startOfToday(addDays(new Date(), 3)),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: startOfToday(addDays(new Date(), 4)),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: startOfToday(addDays(new Date(), 5)),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: startOfToday(addDays(new Date(), 6)),
            dayOfWeek: dayofweek,
            events: []
        },
    ]
        events.forEach(obj => {
            const plainObj = obj.toJSON()
            const dateToPushTo = dates.find(date => date.date === plainObj.date)
            dateToPushTo.events.push(plainObj)
        })
        res.render("schedule", { dates })
        }
        // 

    catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router;
