const express = require('express')
const client = require('../controllers/clientController')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

const router = express.Router()

// criar cliente
router.post('/novoCliente', client.criarCliente, authController.registrarUser)

//autenticar cliente
//  --->/auth/login

//ver perfil
router.get('/profile/:id_cliente', client.clientprofile)

//ver serviços
router.get('/servicos', client.verServicos)

//avaliar serviço
router.post('/servico/:id_servico', auth ,client.avaliarServico)

//modificar dados
router.put('/modificarDados', auth ,client.modificarDados, authController.modUser)

module.exports = router
