const { ERR_MSG } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? ERR_MSG.SERVER_ERROR : message,
  });

  next();
};
