const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const card = require('./routes/card');
const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', card);
app.use('/users', user);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен, порт: ${PORT}.`);
});
