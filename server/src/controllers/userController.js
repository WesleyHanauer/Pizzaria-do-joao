const userModel = require("../models/UserModel")

exports.get = async () => {
    return await userModel.get();
}
exports.login = async (data) => {
    return await userModel.login(data);
}

exports.logout = async (token) => {
    return await userModel.logout(token);
}

exports.cadastro = async (data) => {
    return await userModel.cadastro(data);
}

exports.verifyJWT = (token) => {
    return userModel.verifyJWT(token);
}