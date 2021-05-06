const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const { ERR_MSG } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError(ERR_MSG.UNAUTHORIZED);
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
    );
  } catch (err) {
    next(new UnauthorizedError(ERR_MSG.UNAUTHORIZED));
  }

  req.user = payload;

  next();
};
