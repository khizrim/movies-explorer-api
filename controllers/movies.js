const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const { ERR_MSG, RESPONSE_MSG } = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send({ data: movies });
  } catch (err) {
    next(err);
  }
};

const addMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });

    res.send({ data: movie });
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError(ERR_MSG.MOVIES.MOVIE_ALREADY_ADDED));
    }

    if (
      err.kind === 'ObjectId' ||
      err.name === 'ValidationError' ||
      err.name === 'CastError'
    ) {
      next(new BadRequestError(ERR_MSG.MOVIES.CANT_ADD_MOVIE));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail(() => {
      throw new NotFoundError(ERR_MSG.MOVIES.MOVIE_NOT_FOUND);
    });

    if (!movie.owner.equals(req.user._id)) {
      throw new ForbiddenError(ERR_MSG.MOVIES.DELETE_FORBIDDEN);
    } else {
      await Movie.deleteOne(movie);
      res.send({ message: RESPONSE_MSG.MOVIES.DELETE_SUCCESS(movie) });
    }
  } catch (err) {
    if (
      err.kind === 'ObjectId' ||
      err.name === 'ValidationError' ||
      err.name === 'CastError'
    ) {
      next(new BadRequestError(ERR_MSG.MOVIES.CANT_DELETE_MOVIE));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
