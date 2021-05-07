const router = require('express').Router();

const { auth } = require('../middlewares/auth.js');

router.use('/', require('./access'));

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));
router.use('*', auth, require('./404'));

module.exports = router;
