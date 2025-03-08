const strategy = require('../Model/strategy');

exports.strategyget = async (req, res) => {
    try {
        const strategies = await strategy.find();
        res.status(200).json(strategies);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}