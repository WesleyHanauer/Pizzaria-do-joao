const massasModel = require('../models/massasModel');

exports.getMassas = async () => {
    return await massasModel.getMassas();
}