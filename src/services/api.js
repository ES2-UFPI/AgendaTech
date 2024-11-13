import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Substitua pela URL real do seu backend

export const getEventos = async () => {
    try {
        const response = await axios.get(`${API_URL}/eventos`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        throw error;
    }
};

export const criarEvento = async (dadosDoEvento) => {
    try {
        const response = await axios.post(`${API_URL}/eventos`, dadosDoEvento);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        throw error;
    }
};