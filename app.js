const express = require('express')
const path = require('path')
const conexaoBD = require('./util/database')
const { Cliente, Morada, Categoria, Imagem, PrestadorServico, Servico, Comentarios } = require('./models/models');



const app = express()

const port = 2000
const hostname = "localhost"


conexaoBD.authenticate()
    .then(() => {
        console.log('A conexão foi establecida com sucesso')
        
        //Sincronizar modelos
        return conexaoBD.sync({force: true});
        //return conexaoBD.sync();
    })

    .then(() => {
      console.log('Tabelas sincronizadas com sucesso!');
  })

    .then(() => {
        // Iniciar o servidor
        app.listen(process.env.PORT ||  port, () => {
          console.log(`Backend rodando em http://${hostname}:${port}/`);
        });
      })

    .catch(error => {
        console.error('Erro ao conectar com base de dados: ', error)
        process.exit(1)
    })