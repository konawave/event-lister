
const router = require('express').Router();
const { Users, Events } = require('../models');
const Op = require("sequelize")
const { startOfToday, endOfDay, addDays, format } = require("date-fns")

router.get('/test', async (req, res) => {
    try {
      res.render('homepage');
      console.log('Success!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

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

router.post('/submit', async (req, res) => {
    try {
      const { eventName, date } = req.body; // Assuming you've set the appropriate name attributes on the input fields
  
      // Create a new record in the database using Sequelize
      await Events.create({
        eventName,
        date,
      });
  
      res.redirect('/success'); // Redirect to a success page after successful submission
    } catch (error) {
      console.error(error);
      res.redirect('/error'); // Redirect to an error page if an error occurs
    }
  });

// Login
router.post('/login', async (req, res) => {
    try {
        const calUserData = await user.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!calUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect Username or password. Please try again!' });
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
        // Array of objects for each day of the week. 
        const dates = [
        {
            date: format(startOfToday(), 'yyyy-MM-dd'),
            dayofweek: today[0],
            events: []
        },
        {
            date: format(startOfToday(addDays(new Date(), 1)), 'yyyy-MM-dd'),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: format(startOfToday(addDays(new Date(), 2)), 'yyyy-MM-dd'),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: format(startOfToday(addDays(new Date(), 3)), 'yyyy-MM-dd'),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: format(startOfToday(addDays(new Date(), 4)), 'yyyy-MM-dd'),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: format(startOfToday(addDays(new Date(), 5)), 'yyyy-MM-dd'),
            dayOfWeek: dayofweek,
            events: []
        },
        {
            date: format(startOfToday(addDays(new Date(), 6)), 'yyyy-MM-dd'),
            dayOfWeek: dayofweek,
            events: []
        },
    ]
        events.forEach(obj => {
            const plainObj = obj.toJSON()
            const dateToPushTo = dates.find(date => date.date === plainObj.date)
            dateToPushTo.events.push(plainObj)
        })
        res.render("schedule", { dates:dates })
        }
        // 

    catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router;
