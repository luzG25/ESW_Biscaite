const express = require('express');
const { criarMorada, listarMoradas, modificarMorada, deletarMorada } = require('../controllers/moradaController');
const router = express.Router();

router.post('/criar', criarMorada);
router.get('/listar', listarMoradas);
router.put('/modificar/:id_morada', modificarMorada);
router.delete('/deletar/:id_morada', deletarMorada);

module.exports = router;
