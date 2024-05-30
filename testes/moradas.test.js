const request = require('supertest');
const app = require('../app.js');

describe('Teste de Moradas', () => {
    it('Lista todas as Moradas',  async () => {
        //definir o codigo para executar o teste
        
        let resultado = await request(app).get('/moradas/listar')
        expect(resultado.statusCode).toEqual(200)
        expect(resultado.body).toHaveProperty('moradas')
    })
})

