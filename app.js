require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/index.js');

const { errors } = require('celebrate');

const { errorHandler } = require('./middlewares/error-handler');
const { limiter } = require('./utils/rate-limits.js');
const { CFG } = require('./utils/config.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = CFG.PORT,
  MONGO_DB = CFG.MONGO_DB,
  MONGO_OPTIONS = CFG.MONGO_OPTIONS,
} = process.env;

const app = express();

mongoose.connect(MONGO_DB, MONGO_OPTIONS);

app.use(requestLogger);

app.use(limiter);
app.use(helmet());
app.use(cors({
  origin: 'https://movies-explorer.khizrim.ru',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
