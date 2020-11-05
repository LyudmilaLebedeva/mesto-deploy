const router = require('express').Router();

const signup = require('./signup');
const signin = require('./signin');
const auth = require('../middlewares/auth');
const user = require('./user');
const card = require('./card');

const NotFoundError = require('../errors/NotFounError');

router.use(signup);
router.use(signin);
router.use(auth);
router.use('/cards', card);
router.use('/users', user);

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
