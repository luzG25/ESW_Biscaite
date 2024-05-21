const Sequelize  = require('sequelize');
const sequelize = require('../util/database');

const Cliente = sequelize.define('Cliente', {
    id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_morada: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    telefone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'cliente',
    timestamps: false
});

module.exports = Cliente;
