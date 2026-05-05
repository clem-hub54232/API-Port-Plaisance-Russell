var express = require('express');
var router = express.Router();

const service = require('../services/users')
const { requireAuth } = require('../middlewares/auth');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'too_many_login_attempts' }
});

router.post('/login', loginLimiter, service.login);
router.use(requireAuth);
router.get('/', service.getAll);
router.get('/:id', service.getById);
router.post('/', service.add);
router.delete('/:id', service.delete);
router.put('/:id', service.edit);

module.exports = router;
