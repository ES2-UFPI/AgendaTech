const Evento = require('../src/models/Evento');
const eventoService = require('../src/services/eventoService');

exports.criarEvento = async (req, res) => {
    try {
        const novoEvento = await eventoService.criarEvento(req.body);
        res.status(201).json(novoEvento);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar evento' });
    }
};

exports.listarEventos = async (req, res) => {
    try {
        const eventos = await eventoService.listarEventos();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar eventos' });
    }
};