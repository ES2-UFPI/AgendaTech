import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import ticketBackground from './assets/ticket.png';
import './Tickets.css';

const Tickets = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ nome: '', email: '' });
    const [pixKey, setPixKey] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/detalhe_evento_por_query/?id=${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar o evento.');
                }
                const data = await response.json();
                setEvento(data);
                generatePixKey(); // Gera uma chave PIX ao carregar o evento
                generateVerificationCode(); // Gera o código de verificação
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvento();
    }, [id]);

    const generatePixKey = () => {
        // Gera uma chave PIX aleatória com 30 caracteres
        const key = Array(30)
            .fill(null)
            .map(() => Math.random().toString(36).charAt(2))
            .join('')
            .toUpperCase();
        setPixKey(`PIX-${key}`);
    };

    const generateVerificationCode = () => {
        // Gera um código de verificação aleatório de 40 caracteres
        const code = Array(40)
            .fill(null)
            .map(() => Math.random().toString(36).charAt(2))
            .join('')
            .toUpperCase();
        setVerificationCode(code);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const generatePDF = () => {
        if (!evento) return;
    
        const doc = new jsPDF({ unit: 'px', format: [700, 500] });
    
        // Adiciona o fundo do ticket
        const background = new Image();
        background.src = ticketBackground;
        doc.addImage(background, 'PNG', 40, 50, 420, 173);
    
        // Adiciona a imagem do evento centralizada no fundo do ticket
        if (evento.imagem) {
            const eventoImg = new Image();
            eventoImg.src = `http://localhost:8000${evento.imagem}`;
            const imgWidth = 130; // Largura fixa
            const imgHeight = (imgWidth * 3) / 4; // Calcula a altura mantendo proporção 4:3
            const xOffsetEvento = 40 + (420 - imgWidth) / 2; // Centraliza horizontalmente
            const yOffsetEvento = 50 + (173 - imgHeight) / 2; // Centraliza verticalmente
            doc.addImage(eventoImg, 'JPEG', xOffsetEvento, yOffsetEvento, imgWidth, imgHeight);
        }
    
        // Informações do evento dentro do ingresso
        doc.setFont('Courier', 'italic');        
        doc.text(`${evento.nome}`, 180, 205);
    
        // Informações do evento abaixo do ticket
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(`Evento: ${evento.nome}`, 20, 250);
        doc.text(`Data: ${evento.data}`, 20, 270);
        doc.text(`Horário: ${evento.horario}`, 20, 290);
        doc.text(`Local: ${evento.local}`, 20, 310);
        doc.text(`Preço: R$ ${evento.preco}`, 20, 330);
    
        // Detalhes do comprador
        doc.setFontSize(12);
        doc.text('Detalhes do Comprador:', 20, 360);
        doc.text(`Nome: ${formData.nome}`, 20, 380);
        doc.text(`Email: ${formData.email}`, 20, 400);
    
        // Chave PIX
        doc.text('Chave PIX:', 20, 430);
        doc.text(`${pixKey}`, 20, 450);
    
        // Observações e código de verificação
        doc.text('* Ingresso será validado após o pagamento da taxa!', 20, 500);
        doc.text('**Caso o evento seja GRATUITO, o valor transferido será destinado para incrementar o Coffee Break do evento.', 20, 520);
        doc.text('----------------------------------------------------------------------------------------------------------------------------------------------------------------------------', 0, 550);
        doc.text(`CÓDIGO DE VERIFICAÇÃO DO EVENTO: ${verificationCode}`, 20, 600);
    
        doc.save(`Ingresso_${evento.nome}.pdf`);
    };
    

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="tickets-container">
            <h1>Gerar Ingresso</h1>
            {evento && (
                <div>
                    <h2>{evento.nome}</h2>
                    <p><strong>Data:</strong> {evento.data}</p>
                    <p><strong>Horário:</strong> {evento.horario}</p>
                    <p><strong>Local:</strong> {evento.local}</p>
                    <p><strong>Preço:</strong> R$ {evento.preco}</p>
                    <p><strong>Chave PIX:</strong> {pixKey}</p>
                </div>
            )}

            <form onSubmit={(e) => {
                e.preventDefault();
                generatePDF();
            }}>
                <h3>Detalhes do Comprador</h3>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Gerar PDF do Ingresso</button>
            </form>
        </div>
    );
};

export default Tickets;

