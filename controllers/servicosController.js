const models = require('../models/models')

// criar prestador de serviço (apartir de um cliente existente)
const criarPrestadorServico = async (req, res) => {
    try {
        id_cliente = req.user.id

        const {  alcunha, imagem_perfil, biografia } = req.body;

        // Validação dos campos
        if (!id_cliente || !alcunha  || !biografia) {
            return res.status(400).json({ error: 'Todos os campos (id_cliente, alcunha, biografia) são obrigatórios.' });
        }

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
        const { id_cliente } = req.user.id
        const { alcunha, imagem_perfil, biografia } = req.body;

        // Validação dos campos
        if (!alcunha || !biografia) {
            return res.status(400).json({ error: 'Todos os campos (alcunha, biografia) são obrigatórios.' });
        }
        
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
        id_cliente = req.user.id

        //prover id_prestador da base dados
        const prestador = await models.PrestadorServico.findOne({id_cliente:id_cliente});
        if (!prestador) {
            return res.status(404).json({ error: 'Prestador de serviço não encontrado' });
A           }   
        const id_prestador = prestador.id
        
        const {  nome_servico, descricao, id_categoria, imagens } = req.body;

        // Validação dos campos
        if (!nome_servico || !descricao) {
            return res.status(400).json({ error: 'Todos os campos (id_prestador, nome_servico, descricao) são obrigatórios.' });
        }

        
        const novoServico = await models.Servico.create({ id_prestador, nome_servico, descricao, id_categoria, imagens });
        res.status(201).json(novoServico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// modificar servico
// /:id_servico/modificar
const modServico = async (req, res) => {
    try {   
        const id_servico = req.params

        const { nome_servico, descricao, id_categoria, imagens } = req.body;
       
        // Validação dos campos
        if (!nome_servico || !descricao) {
            return res.status(400).json({ error: 'Todos os campos (nome_servico, descricao) são obrigatórios.' });
        }


        //procurar o prestador de servico
        id_cliente = req.user.id
        //prover id_prestador da base dados
        const prestador = await models.PrestadorServico.findOne({id_cliente: id_cliente});
        if (!prestador) {
            return res.status(404).json({ error: 'Prestador de serviço não encontrado' });
        } 
        id_prestador = prestador.id

        const servico = await models.Servico.findByPk(id_servico);
        await servico.update({ nome_servico, descricao, id_categoria, imagens });
        res.json({ message: 'Dados do servico atualizados com sucesso' });

    } catch(error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

//deletar Servico
// /:id_servico/delete
const delServico = async (req, res) => {
    try {
        id_servico = req.params;

        //validar o prestador de servico
        id_cliente = req.user.id
        //prover id_prestador da base dados
        const prestador = await models.PrestadorServico.findOne({id_cliente: id_cliente});
        if (!prestador) {
            return res.status(404).json({ error: 'Prestador de serviço não encontrado' });
        } 
        id_prestador = prestador.id
        
        const servico = await models.Servico.findByPk(id_servico);
        if (!servico) {
            return res.status(404).json({ error: 'Serviço não encontrado' });
        }

        // Deleta o cliente
        await models.Servico.destroy({ where: { id_servico:id_servico, id_prestador:id_prestador } });

        res.status(200).json({ message: 'Servico deletado com sucesso' });


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

//deletar conta de prestador de servico
const delPrestadoServico = async (req, res) => {
    try {
        id_prestador= req.params;

        const prestador = await models.PrestadorServico.findByPk(id_prestador);
        if (!prestador) {
            return res.status(404).json({ error: 'Prestador de serviço não encontrado' });
        }

        // Deleta o Prestador de Serviço
        await models.PrestadorServico.destroy({ where: { id_prestador:id_prestador, id_cliente:id_cliente} });

        res.status(200).json({ message: 'Prestador de Servico deletado com sucesso' });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = { criarPrestadorServico, modificarPrestadorServico, criarServico, modServico, delServico, delPrestadoServico };
