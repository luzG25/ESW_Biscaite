const Sequelize = require('sequelize')
const meusequelize = require('../util/database')

const Morada = meusequelize.define('morada', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ilha: {
        type: Sequelize.STRING,
        allowNull: false // Se a coluna ilha não deve ser nula
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false // Se a coluna cidade não deve ser nula
    },
    zona: {
        type: Sequelize.STRING,
        allowNull: false // Valor padrão para allowNull é true, mas explicitamente mostrando aqui
        //defaultValue: 'Desconhecido' // Valor padrão se nenhum valor for fornecido
    }
}, {
    tableName: 'morada', // Nome da tabela no banco de dados
    timestamps: false // Desativa as colunas createdAt e updatedAt automaticamente geradas
});

module.exports = Morada