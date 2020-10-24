const card = require('express').Router();
const { createCard, getCards, deleteCard } = require('../controllers/cards');

card.post('/', createCard);
card.get('/', getCards);
card.delete('/:cardId', deleteCard);

module.exports = card;
