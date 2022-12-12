const express = require('express');
const { enderecoCep } = require('./controlador/buscarEndereco');


const rotas = express();

rotas.get('/endereco/:cep', enderecoCep);


module.exports = rotas;