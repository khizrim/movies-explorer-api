const router = require('express').Router();

const { auth } = require('../middlewares/auth.js');
const { validateCookies } = require('../middlewares/validators.js');

router.use('/', require('./access'));

router.use('/users', validateCookies, auth, require('./users'));
router.use('/movies', validateCookies, auth, require('./movies'));
router.use('*', validateCookies, auth, require('./404'));

module.exports = router;
