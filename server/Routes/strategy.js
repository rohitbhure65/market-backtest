const express = require('express');
const strategyController = require('../Controller/strategy');
const router = express.Router();

// User authentication routes
router
    .get('/strategyget', strategyController.strategyget)

module.exports = router;