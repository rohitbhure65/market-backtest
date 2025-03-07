const express = require('express');
const app = express();
const backtestRoutes = require('./Routes/backtest');
const cors = require('cors');
const DB = require('./Lib/db');
require('dotenv').config();
DB()

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/v1', backtestRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})