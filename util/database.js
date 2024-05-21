const envs = require('./config')
const Sequelize = require('sequelize');

const meuSequelize = new Sequelize (
    envs.DB, envs.USER, envs.PASSWORD, {
        dialect: 'postgres',
        host: envs.HOST,
        timestamps: false
    }
)

module.exports = meuSequelize;