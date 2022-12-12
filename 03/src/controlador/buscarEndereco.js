const { buscarEndereco } = require('utils-playground');
const fs = require('fs/promises');

const enderecoCep = async (req, res) => {
    try {
        const { cep } = req.params;
        //cep.replace("\D", "");

        if (!cep && Number(cep) < 8) {
            return res.status(404).json({ mensagem: 'CEP não Informado ou invalido.' });
        }
        const buscarEnderecoCep = await buscarEndereco(cep);

        const lerJson = await fs.readFile('./src/enderecos.json');
        const parseEndereco = JSON.parse(lerJson);

        parseEndereco.endereco.push({
            buscarEnderecoCep
        });

        // const verificarEnderecoSalvos = parseEndereco.endereco.find((endereco) => { return endereco.cep === cep });
        // console.log(verificarEnderecoSalvos);

        // console.log(verificarEnderecoSalvos);

        // if (verificarEnderecoSalvos > 0) {
        //     //await fs.writeFile('./src/enderecos.json', JSON.stringify(parseEndereco));

        //     return res.status(200).json(buscarEnderecoCep);
        // } else {

        await fs.writeFile('./src/enderecos.json', JSON.stringify(parseEndereco));
        return res.status(200).json(buscarEnderecoCep);
        //}

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno: ${erro}` })
    };
}
module.exports = {
    enderecoCep
};