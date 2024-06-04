const Sequelize = require('sequelize');
const connectionDB = require('./database');

const { Cart, Produto, CartItem, Pessoa } = require('./associa');

/* // Importando modelos
const Pessoa = require('../models/pessoa');
const Produto = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item'); */


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

