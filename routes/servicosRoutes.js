const express = require('express');
const servicos = require('../controllers/servicosController');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/criar', auth, servicos.criarPrestadorServico);
router.put('/modificarprofile/:id_cliente', auth, servicos.modificarPrestadorServico);
router.post('/novoServico', auth, servicos.criarServico)

//modificar servico
router.put(':id_servico/modificar', auth, servicos.modServico)

//deletar servico
router.delete(':id_servico/delete', auth, servicos.delServico)

//deletar conta de prestador de servico
router.delete('deleteprofile/:id_prestador', auth, servicos.delPrestadoServico)

module.exports = router;