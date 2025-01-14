from django.test import TestCase, Client
from django.urls import reverse
from .models import Usuario, Evento
import json
from datetime import date, time

class UsuarioTests(TestCase):
    def setUp(self):
        """Configuração inicial para os testes de Usuario"""
        self.client = Client()
        self.usuario = Usuario.objects.create(
            nome="João",
            sobrenome="Silva",
            username="joaosilva",
            senha="senha123"
        )

    def test_criar_usuario(self):
        """Testa a criação de um usuário"""
        self.assertEqual(self.usuario.nome, "João")
        self.assertEqual(self.usuario.sobrenome, "Silva")
        self.assertEqual(self.usuario.username, "joaosilva")
        self.assertEqual(str(self.usuario), "João Silva")

    def test_cadastrar_usuario_view(self):
        """Testa o endpoint de cadastro de usuário"""
        data = {
            "nome": "Maria",
            "sobrenome": "Santos",
            "username": "mariasantos",
            "senha": "senha456"
        }
        with open('test_image.jpg', 'rb') as img:
            response = self.client.post(
                reverse('cadastrar_usuario'),
                data={
                    **data,
                    "imagem": img
                },
                format='multipart'
            )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Usuario.objects.filter(username="mariasantos").exists())

    def test_cadastrar_usuario_com_username_repetido(self):
        """Testa o cadastro de usuário com username duplicado"""
        data = {
            "nome": "Carlos",
            "sobrenome": "Almeida",
            "username": "joaosilva",  # Username já existente
            "senha": "senha789"
        }
        response = self.client.post(
            reverse('cadastrar_usuario'),
            data=data,
            format='multipart'
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("erro", response.json())
        self.assertEqual(response.json()["erro"], "Nome de usuário já existe.")

    def test_listar_usuarios_view(self):
        """Testa o endpoint de listagem de usuários"""
        response = self.client.get(reverse('listar_usuarios'))
        self.assertEqual(response.status_code, 200)
        usuarios = json.loads(response.content)
        self.assertEqual(len(usuarios), 1)
        self.assertEqual(usuarios[0]['nome'], "João")

class EventoTests(TestCase):
    def setUp(self):
        """Configuração inicial para os testes de Evento"""
        self.client = Client()
        self.evento = Evento.objects.create(
            nome="Workshop Python",
            data=date(2025, 1, 15),
            horario=time(14, 30),
            tipo="presencial",
            local="Centro de Convenções",
            link="https://evento.com",
            descricao="Workshop sobre Python"
        )

    def test_criar_evento(self):
        """Testa a criação de um evento"""
        self.assertEqual(self.evento.nome, "Workshop Python")
        self.assertEqual(self.evento.tipo, "presencial")
        self.assertEqual(str(self.evento), "Workshop Python")

    def test_cadastrar_evento_view(self):
        """Testa o endpoint de cadastro de evento"""
        data = {
            "nome": "Curso Django",
            "data": "2025-02-01",
            "horario": "15:00:00",
            "tipo": "online",
            "local": "Zoom",
            "link": "https://zoom.com/meeting",
            "descricao": "Curso intensivo de Django"
        }
        response = self.client.post(
            reverse('cadastrar_evento'),
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Evento.objects.filter(nome="Curso Django").exists())

    def test_listar_eventos_view(self):
        """Testa o endpoint de listagem de eventos"""
        response = self.client.get(reverse('listar_eventos'))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(len(data['eventos']), 1)
        self.assertEqual(data['eventos'][0]['nome'], "Workshop Python")

    def test_listar_eventos_com_busca(self):
        """Testa a funcionalidade de busca na listagem de eventos"""
        response = self.client.get(
            reverse('listar_eventos'),
            {'nome': 'Python'}
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(len(data['eventos']), 1)
        self.assertEqual(data['eventos'][0]['nome'], "Workshop Python")

class HomeViewTests(TestCase):
    def setUp(self):
        """Configuração inicial para os testes da view home"""
        self.client = Client()

    def test_home_view(self):
        """Testa se a página inicial está carregando corretamente"""
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Backend da Agenda Tech")
        self.assertContains(response, "Cadastrar Usuário")
        self.assertContains(response, "Listar Eventos")
