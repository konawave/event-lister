const router = require('express').Router();

<<<<<<< HEAD
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
=======
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;
>>>>>>> 2b863af523f547984b272d4659efca846200b821
