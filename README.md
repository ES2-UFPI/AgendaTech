# AgendaTech
Agenda Tech é uma plataforma dedicada a exibir eventos relacionados à tecnologia que acontecem em várias cidades.
Nosso objetivo é conectar entusiastas e profissionais com oportunidades para aprender, se conectar e crescer em suas áreas de interesse.

O projeto é dividido em duas partes principais:

- Back-end: Desenvolvido com Django.
- Front-end: Desenvolvido com React.

## Pré-requisitos
Certifique-se de que as seguintes ferramentas estão instaladas no seu sistema:

- 🛠️ Git: Para clonar o repositório.
- 🐍 Python 3.12: Necessário para rodar o backend (Django).
- ⚙️ Node.js (versão 18 ou superior): Necessário para rodar o frontend (React).

## Configuração: Ubuntu 🐧
`1.` Atualizar o Sistema - Atualize os pacotes do sistema e instale os pacotes básicos:

```
sudo apt update
sudo apt upgrade -y
```
`2.` Instalar Dependências Essenciais - Instale o Python:
```
sudo apt install python3 -y
```

`2.1` Verifique a instalação (Opcional):
```
python3 --version
```
`3.` Instale o pip para gerenciar pacotes Python:
```
sudo apt install python3-pip -y
```
`3.1` Verifique a instalação (Opcional):
```
pip3 --version
```
`4.` Instale o Python Virtual Environment:
```
sudo apt install python3.12-venv -y
```
`5.` Instale o Node.js:
```
sudo apt install nodejs -y
```
`5.1` Verifique a instalação (Opcional):
```
node --version
```
`6.` Instale o npm (gerenciador de pacotes Node.js):
```
sudo apt install npm -y
```
`6.1` Verifique a instalação (Opcional):
```
npm --version
```
`7.` Instale o Git:
```
sudo apt install git -y
```
`7.1` Verifique a instalação (Opcional):
```
git --version
```
`8.` Clonar o Repositório
Navegue para o diretório desejado:
```
cd ~  # Ou substitua pelo caminho desejado
```
`9.` Clone o repositório:
```
git clone https://github.com/rngneto/AgendaTech.git
```
`10.` Navegue até a pasta do projeto:
```
cd AgendaTech
```
`11.` Configure o Backend - Navegue para a pasta back:
```
cd back
```
`12.` Configure o ambiente virtual:
```
python3 -m venv venv
```
`13.` Ative o ambiente virtual:
```
source venv/bin/activate
```
`14.` Instale as dependências do backend:
```
pip install -r requirements.txt
```
`15.` Execute as migrações:
```
python manage.py makemigrations
python manage.py migrate
```
`16.` Execute o servidor:
```
python manage.py runserver
```
O servidor estará rodando em: http://127.0.0.1:8000/

`17.` Configure o Frontend - Abra um novo terminal e navegue para a pasta front:
```
cd ~/AgendaTech/front
```
`18.` Instale as dependências do frontend:
```
npm install
```
`19.` Execute o servidor do frontend:
```
npm start
```
O servidor estará rodando em: http://localhost:3000/

***

## Configuração: Windows 🖥️
`1.` Instale o Python - Faça o download do instalador do Python em: https://www.python.org/downloads/  
Drante a instalação, marque a opção "Add Python to PATH". Verifique a instalação (Opcional):
```
python --version
pip --version
```
`2.` Instale o Node.js - Faça o download do instalador do Node.js em: https://nodejs.org/pt   
Verifique a instalação:
```
node --version
npm --version
```
`3.` Instale o Git - Faça o download do instalador do Git em git-scm.com.
Verifique a instalação:
```
git --version
```
`4.` Navegue até o diretório desejado no terminal:
```
cd C:\caminho\do\projeto
```
`5.` Clone o repositório:
```
git clone https://github.com/rngneto/AgendaTech.git
```
`6.` Navegue até a pasta do back-end:
```
cd AgendaTech\back
```
`7.` Configure o ambiente virtual:
```
python -m venv venv
```
`8.` Ative o ambiente virtual:
```
venv\Scripts\activate
```
`9.` Instale as dependências do backend:
```
pip install -r requirements.txt
```
`10.` Execute as migrações:
```
python manage.py makemigrations
python manage.py migrate
```
`11.` Execute o servidor:
```
python manage.py runserver
```

O servidor estará rodando em: http://127.0.0.1:8000/

`12.` Configure o Frontend - Abra um novo terminal e navegue para a pasta front:
```
cd C:\caminho\do\projeto\AgendaTech\front
```
`13.` Instale as dependências do frontend:
```
npm install
```
`14.` Execute o servidor do frontend:
```
npm start
```
O servidor estará rodando em: http://localhost:3000/

***
Equipe AgendaTech:
- 🛠️[Delphino Luciani](https://github.com/dlpaf)
- 🛠️[Vival José](https://github.com/VivalJose) 
- 🛠️[Victor Matheus](https://github.com/Matheus21098)
- 🛠️[Raimundo Neto](https://github.com/rngneto)  
