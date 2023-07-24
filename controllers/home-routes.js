const router = require('express').Router();
const { Users, Events } = require('../models');
const { Op } = require("sequelize");
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
    res.render('schedule');
    console.log('Success directing to login!');
  } catch (err) {
    console.log(err, 'Error directing to login');
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
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

    res.redirect('/schedule')// Redirect to a success page after successful submission
  } catch (error) {
    console.error(error);
    res.redirect('/login')// Redirect to an error page if an error occurs
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const calUserData = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log(calUserData)

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
      req.session.userId = calUserData.id
      
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
// if not validate(username)
// return 400 username issue
// if not validate(password)
// return 400 password issue
// if not User.findOne(username: ...)
// return 400 username exists
// user.create(...)
router.post('/signup', async (req, res) => {
  try {
    // Create a user
    console.log(req.body);
    const newUser = await Users.create({
      username: req.body.username,
      password: req.body.password,
    });

    // If the user was successfully created, you can send a response or redirect to a success page.
    // For example:
    res.status(200).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    // If an error occurs during user creation, handle the error here.
    console.error(error);
    res.status(500).json({ message: 'Failed to create user.' });
  }
});
router.get('/schedule', async (req, res) => {
  //check the session
  // if (!res.session) {
  //   res.redirect('/homepage')res
  // }
  console.log(req.session)
  if (req.session.loggedIn == false || !req.session.userId) {
    res.redirect('/homepage')
    return
  }
  //if not a session send to login page

  try {
    // This creates an array of all events for the week
    const today = startOfToday();
    const endDay = endOfDay(addDays(today, 6));
    const events = await Events.findAll({
      where: {
        date: {
          [Op.between]: [today, endDay],
        },
      },
    });

    // This creates an array of all the dates of the week
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(today, i);
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      dates.push({ date: formattedDate, events: [] });
    }

    // This pushes the relevant events to their respective dates
    if (events && events.length > 0) {
      events.forEach((obj) => {
        const plainObj = obj.toJSON();
        const dateToPushTo = dates.find((date) => date.date === plainObj.date);
        if (dateToPushTo) {
          dateToPushTo.events.push(plainObj);
        }
      });
    }
    res.render('schedule', { dates },);
  } catch (err) {
    console.log(err, 'Error directing to schedule');
    res.status(500).json(err);
  }
});

// ...

module.exports = router;