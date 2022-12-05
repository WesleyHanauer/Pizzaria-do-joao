const saboresModel = require('../models/saboresModel')

exports.getSabores = async () => {
    return await saboresModel.getSabores();
}