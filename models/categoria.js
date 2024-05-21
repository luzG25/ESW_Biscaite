const Sequelize  = require('sequelize');
const sequelize = require('../util/database');

const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    tableName: 'categoria',
    timestamps: false
});

module.exports = Categoria;
