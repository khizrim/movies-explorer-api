const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

const { ERR_MSG } = require('../utils/constants');

router.get('*', (req, res, next) => {
  next(new NotFoundError(ERR_MSG.NOT_FOUND));
});

module.exports = router;
