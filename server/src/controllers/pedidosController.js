const pedidosModel = require('../models/pedidosModel');

exports.getPedidos = async () => {
    return await pedidosModel.getPedidos()
}

exports.postPedido3 = async (data) => {
    return await pedidosModel.postPedido3(data)
}

exports.postPedido2 = async (data) => {
    return await pedidosModel.postPedido2(data)
}

exports.postPedido1 = async (data) => {
    return await pedidosModel.postPedido1(data)
}

exports.mudarStatus = async (data) => {
    return await pedidosModel.mudarStatus(data)
}

exports.excluirPedido = async (data) => {
    return await pedidosModel.excluirPedido(data);
}