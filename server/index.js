const express = require('express');
const app = express();
const backtestRoutes = require('./Routes/backtest');
const strategyRoutes = require('./Routes/strategy');
const cors = require('cors');
const DB = require('./Lib/db');
require('dotenv').config();
DB()

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/v1', backtestRoutes)
app.use('/api/v1', strategyRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})