const express = require('express');
const auth = require('../controllers/authController')

const router = express.Router()

// Registro de novo usuário
router.post('/registrar', auth.registrarUser);

// Autenticação de usuário
router.post('/login', auth.login);

module.exports = router;
