const models = require('../models/models');

const criarMorada = async (req, res) => {
    try {
        const { ilha, cidade, zona } = req.body;
        
        if (!ilha || !cidade || !zona) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const novaMorada = await models.Morada.create({ ilha, cidade, zona });
        res.status(201).json(novaMorada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listarMoradas = async (req, res) => {
    try {
        const moradas = await models.Morada.findAll();
        res.status(200).json({ moradas: moradas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const modificarMorada = async (req, res) => {
    try {
        const { id_morada } = req.params;
        const { ilha, cidade, zona } = req.body;

        const morada = await models.Morada.findByPk(id_morada);
        if (!morada) {
            return res.status(404).json({ error: 'Morada não encontrada' });
        }

        await morada.update({ ilha, cidade, zona });
        res.status(200).json({ message: 'Morada atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletarMorada = async (req, res) => {
    try {
        const { id_morada } = req.params;

        const morada = await models.Morada.findByPk(id_morada);
        if (!morada) {
            return res.status(404).json({ error: 'Morada não encontrada' });
        }

        await morada.destroy();
        res.status(200).json({ message: 'Morada deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { criarMorada, listarMoradas, modificarMorada, deletarMorada };
