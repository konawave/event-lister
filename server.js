const path = require('path');
const express = require('express');
const session = require('express-session');
const cal = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

// post route to get the input of the form from home-routes.js
app.post('/submit', async (req, res) => {
    try {
      const { eventName, date } = req.body; // Assuming you've set the appropriate name attributes on the input fields
  
      // Create a new record in the database using Sequelize
      await events.create({
        eventName,
        date,
      });
  
      res.redirect('/success'); // Redirect to a success page after successful submission
    } catch (error) {
      console.error(error);
      res.redirect('/error'); // Redirect to an error page if an error occurs
    }
  });