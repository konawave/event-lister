
const router = require('express').Router();
const { Users, Events } = require('../models');
const Op = require("sequelize")
const { startOfToday, endOfDay, addDays, format } = require("date-fns");

router.get('/homepage', async (req, res) => {
    try {
      res.render('homepage');
      console.log('Success directing to homepage!');
    } catch (err) {
      console.log(err, "Error directing to homepage");
      res.status(500).json(err);
    }
  });

  router.get('/login', async (req, res) => {
    try {
      res.render('login');
      console.log('Success directing to login!');
    } catch (err) {
      console.log(err, 'Error directing to login');
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

// ...

router.get('/schedule', async (req, res) => {
  try {
    const today = startOfToday();
    const endDay = endOfDay(addDays(new Date(), 6));
    const events = await Events.findAll({
      where: {
        date: {
          [Op.between]: [today, endDay]
        }
      }
    });

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(addDays(today, i), 'yyyy-MM-dd');
      dates.push({ date: formattedDate, events: [] });
    }
    
    // This loop is checing to see the dates from the foor loop above. If the event matches the date, then it should push the event to the date's events property. At the moment, events are only pushed if they match "today."
    for (let i = 0; i < events.length; i++) {
      const obj = events[i];
      const plainObj = obj.toJSON();
      const dateToPushTo = dates.find(date => date.date === plainObj.date);
      dateToPushTo.events.push(plainObj);
    }

    // Pass the 'dates' array to the 'schedule' view when rendering
    res.render('schedule', { dates });
  } catch (err) {
    console.log(err, "Error directing to schedule");
    res.status(500).json(err);
  }
});

// ...



module.exports = router;
