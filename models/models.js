const Cliente = require('./cliente');
const Morada = require('./morada');
const Categoria = require('./categoria');
const Imagem = require('./imagem');
const PrestadorServico = require('./prestadorServico');
const Servico = require('./servico');
const Comentarios = require('./comentario');

// Definindo as relações

PrestadorServico.belongsTo(Cliente, { foreignKey: 'id_cliente', constraints: true, onDelete: 'CASCADE' });
PrestadorServico.belongsTo(Imagem, { foreignKey: 'imagem_perfil' });
Servico.belongsTo(PrestadorServico, { foreignKey: 'id_prestador', constraints: true,onDelete: 'CASCADE' });
Servico.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Servico.belongsTo(Imagem, { foreignKey: 'imagens' });
Comentarios.belongsTo(Servico, { foreignKey: 'id_servico', constraints: true,onDelete: 'CASCADE' });
Comentarios.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Cliente.belongsTo(Morada, { foreignKey: 'id_morada' });

// Exportar os modelos para uso em outros lugares
module.exports = {
    Cliente,
    Morada,
    Categoria,
    Imagem,
    PrestadorServico,
    Servico,
    Comentarios
};
