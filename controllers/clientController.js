const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/models')


//criar cliente
const criarCliente = async (req, res, next) => {
    try {
        const { nome, morada, telefone, email, password } = req.body;

        // Validação dos campos
        if (!nome || !morada  || !telefone || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos (nome, morada, telefone, email, password) são obrigatórios.' });
        }

        const novoCliente = await models.Cliente.create({ id_morada: morada, nome, telefone, email });
        
        req.body.id_cliente = novoCliente.id_cliente; // Adiciona o ID do novo cliente ao corpo da requisição
        
        next(); // Passa para a próxima função middleware
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//autenticar cliente
const autenticarCliente = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validação dos campos
        if (!email || !password) {
            return res.status(400).json({ error: 'Todos os campos (email, password) são obrigatórios.' });
        }

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

//ver perfil
const clientprofile = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const cliente = await models.Cliente.findOne({ where: { id_cliente } });

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        res.json(cliente);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//modificar dados
const modificarDados = async (req, res, next) => {
    try {
        const { id_cliente } = req.params;
        req.body.id = id_cliente
        const { morada, telefone, email } = req.body;

        // Validação dos campos
        if (!morada || !telefone  || !email) {
            return res.status(400).json({ error: 'Todos os campos (morada, telefone, email) são obrigatórios.' });
        }
        
        await models.Cliente.update({ id_morada: morada, telefone: telefone, email:email }, {where:  {id_cliente}});
        
        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

//ver serviços
const verServicos = async (req, res) => {
    try {
        const servicos = await models.Servico.findAll({
            include: [{
                model: models.PrestadorServico,
                attributes: ['alcunha', 'biografia']
            }]
        });

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

        // Validação dos campos
        if (!id_cliente || !comentario  || !pontos) {
            return res.status(400).json({ error: 'Todos os campos (id_cliente, comentario, pontos) são obrigatórios.' });
        }

        const novaAvaliacao = await models.Comentarios.create({ id_servico, id_cliente, comentario, pontos });
        res.status(201).json(novaAvaliacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { criarCliente, autenticarCliente, modificarDados, verServicos, avaliarServico, clientprofile  };
