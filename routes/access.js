const router = require('express').Router();

const { signUp, signIn, singOut } = require('../controllers/users.js');
const { validateSignUpBody, validateSignInBody, validateCookies } = require('../middlewares/validators.js');

router.post('/signup', validateSignUpBody, signUp);
router.post('/signin', validateSignInBody, signIn);
router.post('/signout', validateCookies, singOut);

module.exports = router;
