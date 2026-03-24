var express = require('express');
var router = express.Router();

const service = require('../services/users')
router.get('/:id', service.getById);
router.post('/add', service.add);

module.exports = router;