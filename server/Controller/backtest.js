const Backtest = require('../Model/backtest');

exports.backtestadd = async (req, res) => {
    try {
        const { entryPrice, closingPrice, date } = req.body;
        const profit = closingPrice - entryPrice;
        const result = profit < 40 ? "Loss" : "Profit";

        const newbacktest = new Backtest({
            ...req.body,
            profit,
            result
        });

        const savedbacktest = await newbacktest.save();
        res.status(201).json(savedbacktest);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.backtestget = async (req, res) => {
    try {
        // // const { day, time, stockType, timeFrame, strategyName, result, date, sort, order } = req.query;
        const { day, time, stockType, timeFrame, strategyName, result, date } = req.query;
        const queryobject = {};

        // Building the query based on provided filters
        if (day) {
            queryobject.day = { $regex: day, $options: 'i' };
        }
        if (time) {
            queryobject.time = { $regex: time, $options: 'i' };
        }
        if (stockType) {
            queryobject.stockType = { $regex: stockType, $options: 'i' };
        }
        if (timeFrame) {
            queryobject.timeFrame = { $regex: timeFrame, $options: 'i' };
        }
        if (strategyName) {
            queryobject.strategyName = { $regex: strategyName, $options: 'i' };
        }
        if (result) {
            queryobject.result = { $regex: result, $options: 'i' };
        }
        if (date) {
            queryobject.date = { $regex: date, $options: 'i' };
        }

        // console.log(queryobject);
        let backtestQuery = Backtest.find(queryobject);
        // let backtestQuery = Backtest.find();

        // Sort validation
        // if (sort) {
        //     backtestQuery = backtestQuery.sort({ [sort]: order });
        // }

        // // Pagination
        // let page = Math.max(Number(req.query.page) || 1);
        // let limit = Math.max(Number(req.query.limit) || 6);
        // let skip = (page - 1) * limit;

        // backtestQuery = backtestQuery.skip(skip).limit(limit);

        const finalquery = await backtestQuery;

        res.status(200).json(finalquery);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}