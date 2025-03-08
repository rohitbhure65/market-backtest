const mongoosh = require('mongoose');

const StrategySchema = new mongoosh.Schema({
    StrategyName: { type: String, required: true },
    Description: { type: String, required: false }
});

const Strategy = mongoosh.model('Strategy', StrategySchema);

module.exports = Strategy;