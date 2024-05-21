const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Comentarios = sequelize.define('Comentarios', {
    id_comentario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_servico: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comentario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pontos: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'comentarios',
    timestamps: true
});

module.exports = Comentarios;