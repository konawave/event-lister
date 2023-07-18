const router = require('express').Router();

const homeRoutes = require('./home-routes');

router.use('/users', homeRoutes);

module.exports = router;
