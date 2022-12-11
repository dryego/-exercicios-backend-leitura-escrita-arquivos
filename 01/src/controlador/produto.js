const produtos = require('../bancodedados/produtos');
const { getStateFromZipcode } = require('utils-playground');
const { freteNordeste, freteSudeste, fretepadrao } = require('../bancodedados/frete');

const listaProdutos = (req, res) => {
    return res.status(200).json(produtos);
};

const BuscarProdutoId = (req, res) => {
    const { idProduto } = req.params;

    if (isNaN(idProduto) === true) {
        return res.status(400).json({ mensagem: 'ID informado Não e um numero valido.' });
    };

    const produto = produtos.find((produto) => {
        return produto.id === Number(idProduto);
    });

    if (!produto) {
        return res.status(404).json({ mensagem: 'produto NÃO encontrado.' })
    };

    return res.status(201).json(produto);
};

const calcularFrete = async (req, res) => {
    const { idProduto, cep } = req.params;

    if (isNaN(idProduto) === true) {
        return res.status(400).json({ mensagem: 'ID informado Não e um numero valido.' });
    };

    const produto = produtos.find((produto) => {
        return produto.id === Number(idProduto);
    });

    if (!produto) {
        return res.status(404).json({ mensagem: 'produto NÃO encontrado.' })
    };

    if (cep.length !== 8) {
        return res.status(404).json({ mensagem: 'CEP invalido.' })
    };

    try {

        const estadoDeDestino = await getStateFromZipcode(cep);

        let tipodeFreteT = freteNordeste.indexOf(estadoDeDestino);

        if (tipodeFreteT >= 0) {

            const detalhes = {
                produto,
                estado: estadoDeDestino,
                frete: produto.valor * 0.10
            };
            return res.json(detalhes);
        };

        tipodeFreteT = freteSudeste.indexOf(estadoDeDestino);

        if (tipodeFreteT >= 0) {
            const detalhes = {
                produto,
                estado: estadoDeDestino,
                frete: produto.valor * 0.15
            }
            return res.json(detalhes);
        };

        const detalhes = {
            produto,
            estado: estadoDeDestino,
            frete: produto.valor * fretepadrao
        }
        return res.json(detalhes);
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro inesperado.' })
    };
};

module.exports = {
    listaProdutos,
    BuscarProdutoId,
    calcularFrete

};