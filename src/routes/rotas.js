const express = require('express');
const eventoRouter = require('./evento');
const chatRouter = require('./chat');

const roteamento = express.Router();

roteamento.use('/eventos', eventoRouter);
roteamento.use('/chat', chatRouter);

module.exports = roteamento;