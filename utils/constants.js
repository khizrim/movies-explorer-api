const ERR_MSG = {
  BAD_REQUEST: 'Отправлен неправильный запрос.',
  SERVER_ERROR: 'На сервере произошла ошибка',
  NOT_FOUND: 'Ресурс по указанному маршруту не найден',
  UNAUTHORIZED: 'Необходима авторизация',

  MOVIES: {
    MOVIES_NOT_FOUND: 'Сохранённые фильмы не найдены',
    MOVIE_NOT_FOUND: 'Не получилось найти нужный фильм, проверьте ID фильма',
    MOVIE_ALREADY_ADDED: 'Этот фильм уже добавлен',
    CANT_ADD_MOVIE: 'Не получилось добавить фильм, проверьте переданные данные',
    CANT_DELETE_MOVIE: 'Не получилось удалить фильм, проверьте переданные данные',
    DELETE_FORBIDDEN: 'Вы не можете удалять чужие фильмы',
  },

  USER: {
    USER_NOT_FOUND: 'Пользователь c указанным ID не найден',
    EMAIL_ALREADY_USED: 'Пользователь с такой почтой уже зарегистрирован',
    CANT_SIGNUP: 'Не получилось зарегистрировать пользователя, проверьте переданные данные',
    CANT_LOGIN: 'Неправильные почта или пароль',
    CANT_UPDATE_USER: 'Не получилось обновить данные пользователя, проверьте переданные данные',
  },
};

const RESPONSE_MSG = {
  MOVIES: {
    DELETE_SUCCESS: movie => `Фильм «${movie.nameRU}» успешно удалён из вашей коллекции`,
  },
  USER: {
    SIGNOUT_SUCCESS: 'Вы успешно вышли с сайта',
  },
};

const VALIDATION_MSG = {
  MOVIES: {
    ENTER_IMG_URL: 'Введите ссылку на изображение',
    ENTER_THMB_URL: 'Введите ссылку на обложку',
    ENTER_TRAILER_URL: 'Введите ссылку на трейлер',
    ENTER_VALID_ID: 'Введите валидный ID фильма',
  },
  USER: {
    ENTER_EMAIL: 'Введите адрес электронной почты',
    ENTER_VALID_ID: 'Введите валидный ID пользователя',
  },
};

module.exports = {
  ERR_MSG,
  RESPONSE_MSG,
  VALIDATION_MSG,
};
