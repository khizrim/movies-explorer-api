const router = require('express').Router();

const { getUserInfo, editUserInfo } = require('../controllers/users');
const { validateUserInfoBody } = require('../middlewares/validators');

router.get('/me', getUserInfo);
router.patch('/me', validateUserInfoBody, editUserInfo);

module.exports = router;
