const { ObjectId } = require('mongoose').Types;

const { celebrate, Joi } = require('celebrate');
const { isEmail, isURL } = require('validator');

const { VALIDATION_MSG } = require('../utils/constants');

module.exports.validateCookies = celebrate({
  cookies: Joi.object().keys({
    token: Joi.string().required(),
  }),
});

module.exports.validateSignInBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => (isEmail(value)
        ? value
        : helpers.message(VALIDATION_MSG.USER.ENTER_EMAIL))),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateSignUpBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string()
      .required()
      .custom((value, helpers) => (isEmail(value)
        ? value
        : helpers.message(VALIDATION_MSG.USER.ENTER_EMAIL))),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateMovieBody = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .custom((value, helpers) => (isURL(value)
          ? value
          : helpers.message(VALIDATION_MSG.MOVIES.ENTER_IMG_URL))),
      trailer: Joi.string()
        .required()
        .custom((value, helpers) => (isURL(value)
          ? value
          : helpers.message(VALIDATION_MSG.MOVIES.ENTER_TRAILER_URL))),
      thumbnail: Joi.string()
        .required()
        .custom((value, helpers) => (isURL(value)
          ? value
          : helpers.message(VALIDATION_MSG.MOVIES.ENTER_THMB_URL))),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    })
    .unknown(true),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value, helpers) => (ObjectId.isValid(value)
        ? value
        : helpers.message(VALIDATION_MSG.MOVIES.ENTER_VALID_ID))),
  }),
});

module.exports.validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .custom((value, helpers) => (isEmail(value)
        ? value
        : helpers.message(VALIDATION_MSG.USER.ENTER_EMAIL))),
  }),
});
