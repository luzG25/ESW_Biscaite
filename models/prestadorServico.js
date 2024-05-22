const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const PrestadorServico = sequelize.define('PrestadorServico', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type:Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    alcunha: {
        type: Sequelize.STRING,
        allowNull: true
    },
    imagem_perfil: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    biografia: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    tableName: 'prestador_servico',
    timestamps: false
});

module.exports = PrestadorServico;
