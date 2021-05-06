const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const { ERR_MSG, RESPONSE_MSG } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError(ERR_MSG.USER.USER_NOT_FOUND);
    }

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

const editUserInfo = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError(ERR_MSG.USER.USER_NOT_FOUND);
    }

    res.send({ data: user });
  } catch (err) {
    if (
      err.kind === 'ObjectId'
      || err.name === 'ValidationError'
      || err.name === 'CastError'
    ) {
      next(new BadRequestError(ERR_MSG.USER.CANT_UPDATE_USER));
    } else {
      next(err);
    }
  }
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = User.create({
      name,
      email,
      password: hash,
    });

    res.send({ data: user.toJSON() });
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError(ERR_MSG.USER.EMAIL_ALREADY_USED));
    }

    if (
      err.kind === 'ObjectId'
      || err.name === 'ValidationError'
      || err.name === 'CastError'
    ) {
      next(new BadRequestError(ERR_MSG.USER.CANT_SIGNUP));
    } else {
      next(err);
    }
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials({ email, password });

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
      { expiresIn: '7d' },
    );

    res
      .cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
      .send({ data: user });
  } catch (err) {
    next(err);
  }
};

const singOut = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new BadRequestError(ERR_MSG.BAD_REQUEST);
    }

    res
      .clearCookie('token')
      .send({ message: RESPONSE_MSG.USER.SIGNOUT_SUCCESS });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserInfo,
  editUserInfo,
  signUp,
  signIn,
  singOut,
};
