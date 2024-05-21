const Sequelize  = require('sequelize');
const sequelize = require('../util/database');

const Imagem = sequelize.define('Imagem', {
    id_imagem: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        allowNull: false
    },
    imagem: {
        type: Sequelize.BLOB,
        allowNull: false
    }
}, {
    tableName: 'imagem',
    timestamps: true
});

module.exports = Imagem;