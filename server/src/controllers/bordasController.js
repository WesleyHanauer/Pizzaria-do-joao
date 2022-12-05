const bordasModel = require('../models/bordasModel');

exports.getBordas = async () => {
    return await bordasModel.getBordas();
}