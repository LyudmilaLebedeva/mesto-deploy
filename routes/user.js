const user = require('express').Router();
const { getUsers, getUser } = require('../controllers/users');

user.get('/', getUsers);
user.get('/:userId', getUser);

module.exports = user;
