const Sequelize = require('sequelize');
const connectionDB = require('./database');

const { Morada, Cliente, PrestadorServico, Servico, Comentarios } = require('../models/models'); 




async function syncDatabase() {
  try {
      await connectionDB.authenticate();
    console.log('Connection realizada com sucesso.');
   
    // Sincroniza todos os modelos
    await connectionDB.sync({ force: true });  // 'force: true' recriará as tabelas a cada execução
   
     // Verifica se a tabela foi criada - somente informação para debug
     const tables = await connectionDB.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
     console.log('Tables in database:', tables);


  } catch (error) {
    console.error('Não se consegue conectar:', error);
  }  finally {
    await connectionDB.close();  }
}

syncDatabase();

