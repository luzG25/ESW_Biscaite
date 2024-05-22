const models = require('../models/models')

// criar prestador de serviço (apartir de um cliente existente)
const criarPrestadorServico = async (req, res) => {
    try {
        const { id_cliente, alcunha, imagem_perfil, biografia } = req.body;
        const cliente = await models.Cliente.findByPk(id_cliente);
        
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        const novoPrestador = await models.PrestadorServico.create({ id_cliente, alcunha, imagem_perfil, biografia });
        res.status(201).json(novoPrestador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//modificar dados do prestador de serviço
const modificarPrestadorServico = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const { alcunha, imagem_perfil, biografia } = req.body;
        
        const prestador = await models.PrestadorServico.findOne({ where: { id_cliente } });
        if (!prestador) {
            return res.status(404).json({ error: 'Prestador de serviço não encontrado' });
        }

        await prestador.update({ alcunha, imagem_perfil, biografia });
        res.json({ message: 'Dados do prestador de serviço atualizados com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//criar serviço
const criarServico = async (req, res) => {
    try {
        const { id_prestador, nome_servico, descricao, id_categoria, imagens } = req.body;
        
        const prestador = await models.PrestadorServico.findByPk(id_prestador);
        if (!prestador) {
            return res.status(404).json({ error: 'Prestador de serviço não encontrado' });
        }

        const novoServico = await models.Servico.create({ id_prestador, nome_servico, descricao, id_categoria, imagens });
        res.status(201).json(novoServico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// todo: Modificar servico

module.exports = { criarPrestadorServico, modificarPrestadorServico, criarServico };
