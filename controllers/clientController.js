const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/models')

// criar cliente
const criarCliente = async (req, res) => {
    try {
        const { nome, morada, telefone, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const novoCliente = await models.Cliente.create({ id_morada: morada, nome: nome, telefone: telefone, email: email, password: hashedPassword });
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//autenticar cliente
const autenticarCliente = async (req, res) => {
    try {
        const { email, password } = req.body;
        const cliente = await models.Cliente.findOne({ where: { email } });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        const isPasswordValid = await bcrypt.compare(password, cliente.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }
        const token = jwt.sign({ id: cliente.id_cliente }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//modificar dados
const modificarDados = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const { morada, telefone, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        
        await models.Cliente.update({ id_morada: morada, telefone: telefone, email:email, password:hashedPassword }, { where: { id_cliente } });
        res.json({ message: 'Dados atualizados com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//ver serviços
const verServicos = async (req, res) => {
    try {
        const servicos = await models.Servico.findAll();
        res.json(servicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//avaliar serviço
const avaliarServico = async (req, res) => {
    try {
        const { id_servico } = req.params;
        const { id_cliente, comentario, pontos } = req.body;
        const novaAvaliacao = await models.Comentarios.create({ id_servico, id_cliente, comentario, pontos });
        res.status(201).json(novaAvaliacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { criarCliente, autenticarCliente, modificarDados, verServicos, avaliarServico };
