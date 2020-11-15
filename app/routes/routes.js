const express = require('express');
const transactionRouter = express.Router();

const controller = require('../services/transactionService.js');

transactionRouter.post('/', controller.create);
transactionRouter.get('/', controller.find);
transactionRouter.get('/findYearMonth', controller.findYearMonth);
transactionRouter.get('/findDescription/:desc', controller.findDescription);
// transactionRouter.get('/:period', controller.findByPeriod);
// transactionRouter.get('/:id', controller.findOne);
transactionRouter.put('/:id', controller.update);
transactionRouter.delete('/:id', controller.remove);
transactionRouter.delete('/', controller.removeAll);

module.exports = transactionRouter;
