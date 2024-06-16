const { Sequelize } = require('sequelize');
const connectionDB = require('./database');

const models = require('../models/models')

async function syncDatabase() {
  let sequelize;
  try {
    sequelize = await connectionDB.authenticate();
    console.log('Connection realizada com sucesso.');

    //await connectionDB.sync({ force: true }); 
    await connectionDB.sync(); 

    const tables = await connectionDB.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log('Tables in database:', tables);
  } catch (error) {
    console.error('Não se consegue conectar:', error);
  } finally {
    if (sequelize && sequelize.connectionManager.isConnected()) {
      await sequelize.close();
      console.log('Conexão fechada.');
    }
  }
}

syncDatabase();