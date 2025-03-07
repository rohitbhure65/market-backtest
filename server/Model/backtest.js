const mongoose = require('mongoose');

const BacktestingSchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true },
    stockType: { type: String, required: true },
    timeFrame: { type: String, required: true },
    strategyName: { type: String, required: true },
    result: { type: String, required: true },
    date: { type: Date, required: true },
    entryPrice: { type: Number, required: true },
    closingPrice: { type: Number, required: true },
    profit:{ type: Number, required: true },
});

const Backtest = mongoose.model('Backtest', BacktestingSchema);

module.exports = Backtest;