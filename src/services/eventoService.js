const Evento = require('../src/models/Evento');

async function criarEvento(dados) {
    const novoEvento = new Evento(dados.id, dados.titulo, dados.data, dados.local, dados.link, dados.descricao, dados.categoria);
    await novoEvento.save();
    return novoEvento;
}

async function listarEventos() {
    return await Evento.find().sort({ data: 1 });
}

module.exports = { criarEvento, listarEventos };