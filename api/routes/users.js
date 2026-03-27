var express = require('express');
var router = express.Router();

const service = require('../services/users')
router.get('/', service.getAll);
router.get('/:id', service.getById);
router.post('/', service.add);
router.delete('/:id', service.delete);
router.put('/:id', service.edit);

module.exports = router;