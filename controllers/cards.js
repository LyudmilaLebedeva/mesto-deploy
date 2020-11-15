/* eslint-disable no-useless-return */
const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFounError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owener: req.user })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({ })
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (String(card.owener) !== String(req.user._id)) {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => {
      res.send({ message: card });
    })
    .catch(next);
};
