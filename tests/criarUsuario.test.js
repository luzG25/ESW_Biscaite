const request = require('supertest');
const app = require('../app');

let morada = 1
let token

describe('Criar um Usuário', () => {
  it('procurar Moradas', async () => {
    const response = await request(app)
      .get('/moradas/listar')

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

    if (response.statusCode == 200)
        morada = 1
  });

  it('Procurar pelos Serviços disponiveis', async () => {
    const response = await request(app).get('/servicos');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Criar um Usuário', async () => {
    const response = await request(app)
      .post('/novoCliente')
      .send ({
        nome: 'John Doe',
        morada: morada,
        telefone: 99934455,
        email: 'jdowe@bisc.cv',
        password: '123'
    })
    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe('John Doe');

    if (response.statusCode == 200)
        token = response.body.token
  });

});