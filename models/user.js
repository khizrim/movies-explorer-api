const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/unauthorized-err');
const { ERR_MSG } = require('../utils/constants');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials({
  email,
  password,
}) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(ERR_MSG.USER.CANT_LOGIN));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(ERR_MSG.USER.CANT_LOGIN));
        }

        return user;
      });
    });
};

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = model('user', userSchema);
