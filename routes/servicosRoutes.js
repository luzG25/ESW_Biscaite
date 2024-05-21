const express = require('express');
const servicos = require('../controllers/servicosController');
const router = express.Router();

router.post('/criar', servicos.criarPrestadorServico);
router.put('/modificar/:id_cliente', servicos.modificarPrestadorServico);
router.post('/novo', servicos.criarServico)

module.exports = router;