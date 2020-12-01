const router = require('express').Router();
const auth = require('../middleware/auth');
const NotFoundError = require('../middleware/errors/NotFoundError');
const {
  login, createUser,
} = require('../controllers/users');
const articles = require('./articles');
const users = require('./users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', auth, users);
router.use('/articles', auth, articles);
// eslint-disable-next-line no-unused-vars
router.get('*', (req, res) => {
  throw new NotFoundError('Requested resource not found');
});
module.exports = router;
