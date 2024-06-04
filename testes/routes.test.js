const request = require('supertest');
const app = require('../server'); 
const { Morada, Cliente, PrestadorServico, Servico, Comentarios } = require('../models'); 

describe('Roteiro de Teste Completo', () => {
    let idMorada;
    let idCliente;
    let idPrestador;
    let idServico;

    it('1. Listar Moradas', async () => {
        const response = await request(app).get('/moradas/listar');
        expect(response.status).toBe(200);
        expect(response.body.morada).toBeDefined();
        
        // Pegue uma morada aleatória da resposta
        idMoradaAleatoria = response.body.morada[0].id;
    });

    it('2. Deletar uma Morada', async () => {
        const response = await request(app).delete(`/moradas/deletar/${idMoradaAleatoria}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Morada deletada com sucesso');
    });

    it('3. Criar um Cliente', async () => {
        const payload = {
            nome: "Miguel Vicente",
            morada: idMorada,
            telefone: 9784255,
            email: "mvice@bisc.cv",
            password: "123"
        };
        const response = await request(app).post('/novoCliente').send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id_cliente');

        // Salvar o ID do cliente
        idCliente = response.body.id_cliente;
    });

    it('4. Autenticar o Cliente', async () => {
        const payload = {
            email: "mvice@bisc.cv",
            password: "123"
        };
        const response = await request(app).post('/autenticate').send(payload);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('5. Criar Prestador de Serviço', async () => {
        const payload = {
            id_cliente: idCliente,
            alcunha: "vic",
            biografia: "best handyman in the city"
        };
        const response = await request(app).post('/servico_admin/criar').send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id_prestador');

        // Salvar o ID do prestador de serviço
        idPrestador = response.body.id_prestador;
    });

    it('6. Criar um Serviço', async () => {
        const payload = {
            id_prestador: idPrestador,
            nome_servico: "Canalização",
            descricao: "Canalização doméstico e industrial"
        };
        const response = await request(app).post('/servico_admin/novoServico').send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id_servico');

        // Salvar o ID do serviço
        idServico = response.body.id_servico;
    });

    it('7. Obter Todos os Serviços', async () => {
        const response = await request(app).get('/servicos');
        expect(response.status).toBe(200);
        expect(response.body.servicos).toBeDefined();
    });

    it('8. Avaliar um Serviço', async () => {
        const payload = {
            id_cliente: idCliente,
            comentario: "Serviço Fantastico",
            pontos: 10
        };
        const response = await request(app).post(`/servico/${idServico}`).send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id_comentario');
    });
});
