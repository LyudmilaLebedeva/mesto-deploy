/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const MIN_PASSWORD_LENGTH = 8;

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    res.status(400).send({
      message: `Не указан пароль или его длина меньше ${MIN_PASSWORD_LENGTH} символов`,
    });
    return;
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ id: user._id }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).send({ message: 'Пользователь с таким e-mail уже зарегистрирован' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({ })
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ message: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Объект не найден' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  let userID;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      userID = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign(
        { _id: userID },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
