const express = require('express');
const cors = require('cors');
const rotas = require('./src/routes/rotas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', rotas);

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));