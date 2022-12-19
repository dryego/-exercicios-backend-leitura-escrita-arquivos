const { buscarEndereco } = require('utils-playground');
const { readFile, writeFile } = require('fs/promises');

const enderecoCep = async (req, res) => {
    const { cep } = req.params;

    try {
        const enderecos = JSON.parse(await readFile('./src/enderecos.json'));


        let endereco = enderecos.find((endereco) => { return endereco.cep.replace('-', '') === cep });

        if (endereco) {
            return res.status(200).json(endereco);
        };

        endereco = await buscarEndereco(cep);

        if (endereco.erro) {
            return res.status(404).json({ mensage: 'Endereço NÂO encontrado.' });
        };

        enderecos.push(endereco);

        await writeFile('./src/enderecos.json', JSON.stringify(enderecos));

        return res.status(200).json(endereco);

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno: ${erro}` })
    };
}
module.exports = {
    enderecoCep
};