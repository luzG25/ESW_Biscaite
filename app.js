const express = require('express')
const path = require('path')
const conexaoBD = require('./util/database')
const conexaoMongoBD = require('./util/mongodb_config')

const inserirMoradas = require('./models/moradaInsert')
const { Cliente, Morada, Categoria, Imagem, PrestadorServico, Servico, Comentarios } = require('./models/models');

const clientRoutes = require('./routes/clientRoutes')
const servicoRoutes = require('./routes/servicosRoutes')
const moradaRoutes = require('./routes/moradaRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()
conexaoMongoBD()


const port = 2000
const hostname = "localhost"

app.use(express.json());
app.use(clientRoutes);
app.use('/servico_admin', servicoRoutes);
app.use('/moradas', moradaRoutes)
app.use('/auth', authRoutes)


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
          console.log(`\n\n\n\n\n\n\nBackend rodando em http://${hostname}:${port}/`);
        });

        console.log('Inserindo moradas na Tabela')
        inserirMoradas(Morada)
      })

    .catch(error => {
        console.error('Erro ao conectar com base de dados: ', error)
        process.exit(1)
    })