const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const routes = require('./routes');
const errorHandeler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(requestLogger);
app.use(errorLogger);
app.use(routes);
app.use(errors());
app.use(errorHandeler);

app.listen(PORT, () => {
  console.log(`Сервер запущен, порт: ${PORT}.`);
});
