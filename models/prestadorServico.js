const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const PrestadorServico = sequelize.define('PrestadorServico', {
    id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    alcunha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem_perfil: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    biografia: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'prestador_servico',
    timestamps: false
});

module.exports = PrestadorServico;
