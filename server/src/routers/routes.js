const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');
const massasController = require('../controllers/massasController');
const bordasController = require('../controllers/bordasController');
const saboresController = require('../controllers/saboresController');
const pedidosController = require('../controllers/pedidosController');

router.get('/', (req, res, next) => {
    res.status(200).send({ 'API': 'OK' });
})

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../../login.html'));
})

router.get('/menu', (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../../menu.html'));
})

router.get('/cadastro', (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../../cadastro.html'));
})

router.get('/pedido', (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../../pedido.html'));
})

router.get('/rastreamento', (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../../rastreamento.html'));
})

router.get("/user", async (req, res, next) => {
    user = await userController.get();
    res.status(200).send(user);
})

router.post('/user/login', async (req, res, next) => {
    user = await userController.login(req.body);
    res.cookie('Token', user.token)
    res.cookie('Usuario', user.user.id)
    res.status(200).send(user);
});

router.post('/user/logout', async (req, res, next) => {
    user = await userController.logout(req.cookies['Token']);
    res.status(200).send(user);
});

router.post('/user/cadastro', async (req, res, next) => {
    user = await userController.cadastro(req.body);
    res.cookie('Token', user.token)
    res.cookie('Usuario', user.user.id)
    res.status(200).send(user);
});

router.get('/massas', async (req, res, next) => {
    massas = await massasController.getMassas();
    console.log(massas[0]['tipo'])
    res.status(200).send(massas);
})

router.get('/bordas', async (req, res, next) => {
    bordas = await bordasController.getBordas();
    res.status(200).send(bordas);
})

router.get('/sabores', async (req, res, next) => {
    sabores = await saboresController.getSabores();
    res.status(200).send(sabores);
})

router.get('/pedidos', async (req, res, next) => {
    pedidos = await pedidosController.getPedidos();
    res.status(200).send(pedidos);
})

router.post('/pedido-tres', async (req, res, next) => {
    pedidos = await pedidosController.postPedido3(req.body);
    res.status(200).send(pedidos);
})

router.post('/pedido-dois', async (req, res, next) => {
    pedidos = await pedidosController.postPedido2(req.body);
    res.status(200).send(pedidos);
})

router.post('/pedido-um', async (req, res, next) => {
    pedidos = await pedidosController.postPedido1(req.body);
    res.status(200).send(pedidos);
})

router.post('/mudar-status', async (req, res, next) => {
    novoStatus = await pedidosController.mudarStatus(req.body);
    res.status(200).send(novoStatus)
})

router.delete('/excluir/:pedido', async (req, res, next) => {
    pedido = req.params['pedido'];
    console.log(pedido)
    excluido = await pedidosController.excluirPedido(pedido);
    res.status(200).send(excluido)
})

module.exports = router;