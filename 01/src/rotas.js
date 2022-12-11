const express = require('express');
const { listaProdutos, BuscarProdutoId, calcularFrete } = require('./controlador/produto');

const rotas = express();

rotas.get('/produtos', listaProdutos);
rotas.get('/produtos/:idProduto', BuscarProdutoId);
rotas.get('/produtos/:idProduto/frete/:cep', calcularFrete)

module.exports = rotas;