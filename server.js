const path = require('path');
const express = require('express');
const session = require('express-session');
<<<<<<< HEAD
const exphbs = require('express-handlebars');
=======
const cal = require('express-handlebars');
>>>>>>> 166e6cb3d9760e8a88182216846078e19d9308b7
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
<<<<<<< HEAD
// const helpers = require('./utils/helpers');
// const { scheduler } = require('timers/promises');
=======
const helpers = require('./utils/helpers');
>>>>>>> 166e6cb3d9760e8a88182216846078e19d9308b7

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
<<<<<<< HEAD
    secret: 'process.env.secret',
=======
    secret: process.env.SECRET,
>>>>>>> 166e6cb3d9760e8a88182216846078e19d9308b7
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

<<<<<<< HEAD
const hbs = exphbs.create({  });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set ('views', './views')
=======
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
>>>>>>> 166e6cb3d9760e8a88182216846078e19d9308b7

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
<<<<<<< HEAD
});
=======
});
>>>>>>> 166e6cb3d9760e8a88182216846078e19d9308b7
