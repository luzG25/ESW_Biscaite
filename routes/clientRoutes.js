const express = require('express')
const client = require('../controllers/clientController')
const router = express.Router()

// criar cliente
router.post('/novoClient', client.criarCliente)

//autenticar cliente
router.post('/autenticate', client.autenticarCliente)

//ver serviços
router.get('/servicos', client.verServicos)

//avaliar serviço
router.post('/servico/:id_servico', client.avaliarServico)

//modificar dados
router.put('/modificarDados/:id_cliente', client.modificarDados)

module.exports = router
