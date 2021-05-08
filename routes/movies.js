const router = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieBody, validateMovieId } = require('../middlewares/validators');

router.get('/', getMovies);
router.post('/', validateMovieBody, addMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
