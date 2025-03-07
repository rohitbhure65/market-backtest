const express = require('express');
const authController = require('../Controller/backtest');
const router = express.Router();

// User authentication routes
router
    .post('/backtestadd', authController.backtestadd)
    .get('/backtestget', authController.backtestget)

module.exports = router;