const express = require('express');
const servicos = require('../controllers/servicosController');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/criar', auth, servicos.criarPrestadorServico);
router.put('/modificar/:id_cliente', auth, servicos.modificarPrestadorServico);
router.post('/novoServico', auth, servicos.criarServico)

//modificar servico

//deletar servico

//deletar conta de prestador de servico

module.exports = router;