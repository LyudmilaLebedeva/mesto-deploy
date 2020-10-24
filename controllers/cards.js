/* eslint-disable no-useless-return */
const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owener: req.user })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({ })
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (String(card.owener) === String(req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ message: card }));
      } else {
        res.status(403).send({
          message: 'Недостаточно прав',
        });
        return;
      }
    })
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
