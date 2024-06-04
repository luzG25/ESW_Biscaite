const fs = require('fs');
const path = require('../util/path')


// Lê o arquivo JSON com as moradas
const moradas = JSON.parse(fs.readFileSync(path + '/DATA/moradas.json', 'utf-8'));

const inserirMoradas = async (Morada) => {
    try {

        // Insere cada morada no banco de dados
        for (const morada of moradas) {
            await Morada.create(morada);
        }
        
        console.log('Moradas inseridas com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir moradas:', error);
    }
};

module.exports = inserirMoradas
