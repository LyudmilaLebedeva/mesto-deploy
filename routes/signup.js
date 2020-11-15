const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser } = require('../controllers/users');

const URL_PATTERN = /https?:\/\/(((www\.)?[a-z\d][a-z\d-]*\.[a-z]{2,})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))((?!:0+)(:([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])))?((\/[a-z\d-]+)*[/#]?)?/;

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(URL_PATTERN),
    email: Joi.string().required().email(),
  }),
}),
createUser);

module.exports = router;
