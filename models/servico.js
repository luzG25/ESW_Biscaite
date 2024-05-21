const Sequelize  = require('sequelize');
const sequelize = require('../util/database');

const Servico = sequelize.define('Servico', {
    id_servico: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_prestador: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome_servico: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imagens: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'servico',
    timestamps: false
});

module.exports = Servico;