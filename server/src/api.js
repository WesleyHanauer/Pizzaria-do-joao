const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../css')));
app.use(express.static(path.join(__dirname, '../../imagens')));

//Rotas
const route = require('./routers/routes');
app.use('/', route);
// app.use('/', route);
app.use('/user', route);

module.exports = app;