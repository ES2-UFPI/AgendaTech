import os
import zipfile
import shutil
import json
from django.test import TestCase, Client
from django.urls import reverse
from django.conf import settings
from django.db import connection
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Usuario, Evento, ListaDesejos
from PIL import Image
from io import BytesIO
from datetime import date, time

class UsuarioTests(TestCase):
    def setUp(self):
        """Configuração inicial para os testes de Usuario"""
        self.client = Client()

        # Criando uma imagem em memória para simular o upload
        image = BytesIO()
        Image.new('RGB', (100, 100), color='blue').save(image, 'JPEG')
        image.seek(0)
        uploaded_image = SimpleUploadedFile("test_image.jpg", image.getvalue(), content_type="image/jpeg")

        # Criando o usuário com uma imagem
        self.usuario = Usuario.objects.create(
            nome="João",
            sobrenome="Silva",
            username="joaosilva",
            senha="senha123",
            imagem=uploaded_image
    )

    def test_criar_usuario(self):
        """Testa a criação de um usuário"""
        self.assertEqual(self.usuario.nome, "João")
        self.assertEqual(self.usuario.sobrenome, "Silva")
        self.assertEqual(self.usuario.username, "joaosilva")
        self.assertEqual(str(self.usuario), "João Silva")

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

    def test_listar_usuario_view(self):
        """Testa o endpoint de listagem de usuários"""
        response = self.client.get(reverse('listar_usuarios'))
        self.assertEqual(response.status_code, 200)
        usuarios = json.loads(response.content)
        self.assertEqual(len(usuarios), 1)
        self.assertEqual(usuarios[0]['nome'], "João")

def test_criar_usuario_imagem(self):
    """Testa a criação de um usuário com imagem"""

    # Criando uma imagem em memória para simular o upload
    image = BytesIO()
    Image.new('RGB', (100, 100), color='green').save(image, 'JPEG')
    image.seek(0)
    uploaded_image = SimpleUploadedFile("test_user_image.jpg", image.getvalue(), content_type="image/jpeg")

    # Dados do usuário
    data = {
        "nome": "Maria",
        "sobrenome": "Santos",
        "username": "mariasantos",
        "senha": "senha456",
        "imagem": uploaded_image
    }

    # Envia a requisição POST para criar o usuário
    response = self.client.post(
        reverse('cadastrar_usuario'),
        data=data,
        format="multipart"  # Formato necessário para envio de arquivos
    )

    # Verificação da resposta
    self.assertEqual(response.status_code, 201)
    response_data = response.json()
    self.assertIn("mensagem", response_data)
    self.assertEqual(response_data["mensagem"], "Usuário cadastrado com sucesso!")
    self.assertEqual(response_data["username"], "mariasantos")
    self.assertIsNotNone(response_data["imagem"], "A imagem deveria ser salva e retornar uma URL.")

    # Verifica se o usuário foi salvo no banco de dados
    usuario = Usuario.objects.get(username="mariasantos")
    self.assertEqual(usuario.nome, "Maria")
    self.assertEqual(usuario.sobrenome, "Santos")
    self.assertEqual(usuario.username, "mariasantos")
    self.assertIsNotNone(usuario.imagem, "A imagem deveria estar salva no banco de dados.")
    self.assertTrue(usuario.imagem.name.startswith("usuarios/"), "A imagem não foi salva no diretório correto.")
    
def test_listar_usuarios_view(self):
        """Testa o endpoint de listagem de todos os usuários"""

        # Criar múltiplos usuários para o teste
        Usuario.objects.create(
            nome="Maria",
            sobrenome="Santos",
            username="mariasantos",
            senha="senha456"
        )
        Usuario.objects.create(
            nome="Carlos",
            sobrenome="Almeida",
            username="carlosalmeida",
            senha="senha789"
        )

        # Requisição para listar todos os usuários
        response = self.client.get(reverse('listar_usuarios'))
        self.assertEqual(response.status_code, 200)
        usuarios = json.loads(response.content)
        
        # Certificar-se de que todos os usuários foram retornados
        self.assertEqual(len(usuarios), 3)  # Incluindo o usuário criado no setUp
        self.assertEqual(usuarios[0]['nome'], "João")
        self.assertEqual(usuarios[1]['nome'], "Maria")
        self.assertEqual(usuarios[2]['nome'], "Carlos")

def test_login_usuario(self):
    """Testa o endpoint de login de um usuário"""

    # Cenário 1: Login bem-sucedido
    data_login_sucesso = {
        "username": "joaosilva",
        "senha": "senha123"
    }
    response_sucesso = self.client.post(
        reverse('login_usuario'),
        data=json.dumps(data_login_sucesso),
        content_type='application/json'
    )

    self.assertEqual(response_sucesso.status_code, 200)
    response_data = response_sucesso.json()
    self.assertIn("mensagem", response_data)
    self.assertEqual(response_data["mensagem"], "Login realizado com sucesso!")
    self.assertEqual(response_data["username"], "joaosilva")
    self.assertEqual(response_data["nome"], "João")
    self.assertEqual(response_data["sobrenome"], "Silva")
    self.assertIsNone(response_data["imagem"])  # Nenhuma imagem foi adicionada no setup

    # Cenário 2: Login com senha incorreta
    data_senha_incorreta = {
        "username": "joaosilva",
        "senha": "senha_errada"
    }
    response_senha_incorreta = self.client.post(
        reverse('login_usuario'),
        data=json.dumps(data_senha_incorreta),
        content_type='application/json'
    )

    self.assertEqual(response_senha_incorreta.status_code, 401)
    self.assertIn("erro", response_senha_incorreta.json())
    self.assertEqual(response_senha_incorreta.json()["erro"], "Usuário ou senha incorretos.")

    # Cenário 3: Login com username inexistente
    data_usuario_inexistente = {
        "username": "usuario_inexistente",
        "senha": "qualquer_senha"
    }
    response_usuario_inexistente = self.client.post(
        reverse('login_usuario'),
        data=json.dumps(data_usuario_inexistente),
        content_type='application/json'
    )

    self.assertEqual(response_usuario_inexistente.status_code, 401)
    self.assertIn("erro", response_usuario_inexistente.json())
    self.assertEqual(response_usuario_inexistente.json()["erro"], "Usuário ou senha incorretos.")

    # Cenário 4: Login com dados faltando
    data_faltando_username = {"senha": "senha123"}
    response_faltando_username = self.client.post(
        reverse('login_usuario'),
        data=json.dumps(data_faltando_username),
        content_type='application/json'
    )

    self.assertEqual(response_faltando_username.status_code, 400)
    self.assertIn("erro", response_faltando_username.json())

    # Cenário 5: Método não permitido
    response_metodo_nao_permitido = self.client.get(reverse('login_usuario'))
    self.assertEqual(response_metodo_nao_permitido.status_code, 405)
    self.assertEqual(response_metodo_nao_permitido.json()["erro"], "Método não permitido")

def test_listar_usuarios_json_view(self):
    """Testa o endpoint de listagem de todos os usuários em formato JSON"""

    # Criação de usuários adicionais com caracteres especiais no nome
    Usuario.objects.create(
        nome="José",
        sobrenome="da Silva",
        username="jose.silva",
        senha="senha123"
    )
    Usuario.objects.create(
        nome="Mária",
        sobrenome="Oliveira",
        username="maria.oliveira",
        senha="senha456"
    )

    # Requisição para o endpoint
    response = self.client.get(reverse('listar_usuarios_json'))

    # Verifica se o status da resposta é 200 (OK)
    self.assertEqual(response.status_code, 200)

    # Converte o conteúdo da resposta em JSON
    usuarios_data = response.json()

    # Verifica se o número de usuários está correto
    self.assertEqual(len(usuarios_data), 3)  # Inclui o usuário criado no setUp

    # Verifica os dados dos usuários
    self.assertEqual(usuarios_data[0]['nome'], "João")
    self.assertEqual(usuarios_data[0]['sobrenome'], "Silva")

    self.assertEqual(usuarios_data[1]['nome'], "José")
    self.assertEqual(usuarios_data[1]['sobrenome'], "da Silva")

    self.assertEqual(usuarios_data[2]['nome'], "Mária")
    self.assertEqual(usuarios_data[2]['sobrenome'], "Oliveira")

def test_excluir_usuario(self):
    """Testa a exclusão de um usuário"""

    # Verifica que o usuário existe antes da exclusão
    usuario = Usuario.objects.get(username="joaosilva")
    self.assertIsNotNone(usuario)

    # Exclui o usuário
    usuario.delete()

    # Verifica que o usuário foi removido do banco de dados
    self.assertFalse(Usuario.objects.filter(username="joaosilva").exists())

def test_atualizar_usuario(self):
    """Testa a atualização dos dados de um usuário"""

    # Busca o usuário existente
    usuario = Usuario.objects.get(username="joaosilva")

    # Atualiza os dados do usuário
    usuario.nome = "João Atualizado"
    usuario.sobrenome = "Silva Atualizado"
    usuario.save()

    # Busca novamente o usuário atualizado
    usuario_atualizado = Usuario.objects.get(username="joaosilva")

    # Verifica se os dados foram atualizados corretamente
    self.assertEqual(usuario_atualizado.nome, "João Atualizado")
    self.assertEqual(usuario_atualizado.sobrenome, "Silva Atualizado")

def test_buscar_usuario_por_nome(self):
    """Testa a busca de usuários pelo nome"""

    # Criar usuários adicionais para o teste
    Usuario.objects.create(
        nome="Maria",
        sobrenome="Santos",
        username="mariasantos",
        senha="senha456"
    )
    Usuario.objects.create(
        nome="João",
        sobrenome="Almeida",
        username="joaoalmeida",
        senha="senha789"
    )

    # Buscar usuários com o nome "João"
    usuarios = Usuario.objects.filter(nome="João")

    # Verificar o número de usuários encontrados
    self.assertEqual(len(usuarios), 2)

    # Verificar os dados dos usuários encontrados
    self.assertEqual(usuarios[0].nome, "João")
    self.assertEqual(usuarios[1].nome, "João")

def test_cadastrar_usuario_dados_invalidos(self):
    """Testa o cadastro de usuário com dados inválidos"""

    # Tenta cadastrar sem o campo "username"
    data_sem_username = {
        "nome": "Carlos",
        "sobrenome": "Almeida",
        "senha": "senha123"
    }
    response_sem_username = self.client.post(
        reverse('cadastrar_usuario'),
        data=data_sem_username,
        format='multipart'
    )

    self.assertEqual(response_sem_username.status_code, 400)
    self.assertIn("erro", response_sem_username.json())

    # Tenta cadastrar sem o campo "nome"
    data_sem_nome = {
        "sobrenome": "Almeida",
        "username": "carlosalmeida",
        "senha": "senha123"
    }
    response_sem_nome = self.client.post(
        reverse('cadastrar_usuario'),
        data=data_sem_nome,
        format='multipart'
    )

    self.assertEqual(response_sem_nome.status_code, 400)
    self.assertIn("erro", response_sem_nome.json())



class EventoTests(TestCase):
    def setUp(self):
        """Configuração inicial para os testes de Evento"""
        self.client = Client()

        # Criando uma imagem válida para upload
        image = BytesIO()
        img = Image.new('RGB', (100, 100), color='blue')
        img.save(image, format='JPEG')
        image.seek(0)

        self.uploaded_image = SimpleUploadedFile(
            "imagem-cortada.jpg",  # Nome do arquivo de upload
            image.getvalue(),
            content_type="image/jpeg"
        )

        # Criando um evento inicial com imagem
        self.evento = Evento.objects.create(
            nome="Workshop Python",
            data="2025-01-15",
            horario="14:30:00",
            tipo="presencial",
            local="Centro de Convenções",
            link="https://evento.com",
            descricao="Workshop sobre Python",
            preco=150.00,
            imagem=self.uploaded_image  # Salvando a imagem inicial
        )

    def test_cadastrar_evento_view(self):
        """Testa o endpoint de cadastro de evento"""
        # Dados para o novo evento
        data = {
            "nome": "Curso Django",
            "data": "2025-02-01",
            "horario": "15:00:00",
            "tipo": "online",
            "local": "Zoom",
            "link": "https://zoom.com/meeting",
            "descricao": "Curso intensivo de Django",
            "preco": "200.00"
        }

        # Criando uma imagem em memória com o nome correto
        image = BytesIO()
        Image.new('RGB', (100, 100), color='green').save(image, 'JPEG')
        image.seek(0)
        uploaded_image = SimpleUploadedFile("imagem-cortada.jpg", image.getvalue(), content_type="image/jpeg")

        # Simular envio com 'multipart/form-data'
        response = self.client.post(
            reverse('cadastrar_evento'),
            data={**data, "imagem": uploaded_image},
            format="multipart"
        )

        # Depuração para verificar resposta do servidor
        print("Status Code:", response.status_code)
        print("Response Content:", response.content.decode())

        # Verifica se o evento foi cadastrado corretamente
        self.assertEqual(response.status_code, 201, f"Erro: {response.content.decode()}")
        self.assertTrue(Evento.objects.filter(nome="Curso Django").exists())

        # Verifica os dados do evento cadastrado
        evento_cadastrado = Evento.objects.get(nome="Curso Django")
        self.assertEqual(evento_cadastrado.tipo, "online")
        self.assertEqual(evento_cadastrado.local, "Zoom")
        self.assertEqual(float(evento_cadastrado.preco), 200.00)
        self.assertIsNotNone(evento_cadastrado.imagem)

        # Verifica se a imagem foi salva com o prefixo correto
        self.assertTrue(evento_cadastrado.imagem.name.startswith("eventos/imagem-cortada"),
                        f"O nome da imagem salva não segue o padrão esperado: {evento_cadastrado.imagem.name}")
        
    def test_cadastrar_evento_sem_preco_sem_imagem_view(self):
        """Testa o endpoint de cadastro de evento"""
        data = {
            "nome": "Curso Django",
            "data": "2025-02-01",
            "horario": "15:00:00",
            "tipo": "online",
            "local": "Zoom",
            "link": "https://zoom.com/meeting",
            "descricao": "Curso intensivo de Django",
            "preco": "100.00"
        }

        # Simular envio com 'multipart/form-data'
        response = self.client.post(
            reverse('cadastrar_evento'),
            data,  # Envio direto dos dados como dicionário
            format="multipart"  # Especificar envio no formato multipart
        )

        # Depuração para verificar resposta do servidor
        print("Status Code:", response.status_code)
        print("Response Content:", response.content.decode())

        # Verificar se o evento foi criado corretamente
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

def test_detalhe_evento_view(self):
    """Testa o endpoint de detalhes de um evento"""
    # Evento existente criado no setUp
    evento = self.evento

    # Cenário 1: ID válido fornecido
    response = self.client.get(reverse('detalhe_evento'), {'id': evento.id})
    self.assertEqual(response.status_code, 200)
    evento_data = response.json()

    self.assertEqual(evento_data['id'], evento.id)
    self.assertEqual(evento_data['nome'], evento.nome)
    self.assertEqual(evento_data['data'], evento.data.strftime('%Y-%m-%d'))
    self.assertEqual(evento_data['horario'], evento.horario.strftime('%H:%M'))
    self.assertEqual(evento_data['tipo'], evento.tipo)
    self.assertEqual(evento_data['local'], evento.local)
    self.assertEqual(evento_data['link'], evento.link)
    self.assertEqual(evento_data['descricao'], evento.descricao)
    self.assertEqual(float(evento_data['preco']), float(evento.preco))
    self.assertIsNotNone(evento_data['imagem'])

    # Cenário 2: ID não fornecido
    response_sem_id = self.client.get(reverse('detalhe_evento'))
    self.assertEqual(response_sem_id.status_code, 400)
    self.assertIn("erro", response_sem_id.json())
    self.assertEqual(response_sem_id.json()["erro"], "ID do evento não fornecido.")

    # Cenário 3: ID inexistente
    response_id_inexistente = self.client.get(reverse('detalhe_evento'), {'id': 999})
    self.assertEqual(response_id_inexistente.status_code, 404)
    self.assertIn("erro", response_id_inexistente.json())

def test_editar_perfil(self):
    """Testa o endpoint de edição de perfil do usuário"""

    # Cenário 1: Atualização bem-sucedida
    data_atualizacao_sucesso = {
        "username": "joaosilva",
        "nome": "João Atualizado",
        "sobrenome": "Silva Atualizado",
        "novo_username": "joao_atualizado"
    }
    response_sucesso = self.client.post(
        reverse('editar_perfil'),
        data=json.dumps(data_atualizacao_sucesso),
        content_type='application/json'
    )
    self.assertEqual(response_sucesso.status_code, 200)
    response_data = response_sucesso.json()
    self.assertEqual(response_data["mensagem"], "Perfil atualizado com sucesso!")
    self.assertEqual(response_data["usuario"]["nome"], "João Atualizado")
    self.assertEqual(response_data["usuario"]["sobrenome"], "Silva Atualizado")
    self.assertEqual(response_data["usuario"]["username"], "joao_atualizado")

    # Verifica se os dados foram salvos no banco
    usuario = Usuario.objects.get(username="joao_atualizado")
    self.assertEqual(usuario.nome, "João Atualizado")
    self.assertEqual(usuario.sobrenome, "Silva Atualizado")

    # Cenário 2: Nome de usuário não fornecido
    data_sem_username = {
        "nome": "Carlos"
    }
    response_sem_username = self.client.post(
        reverse('editar_perfil'),
        data=json.dumps(data_sem_username),
        content_type='application/json'
    )
    self.assertEqual(response_sem_username.status_code, 400)
    self.assertIn("erro", response_sem_username.json())
    self.assertEqual(response_sem_username.json()["erro"], "Nome de usuário não fornecido.")

    # Cenário 3: Usuário não encontrado
    data_usuario_inexistente = {
        "username": "usuario_inexistente",
        "nome": "Carlos"
    }
    response_usuario_inexistente = self.client.post(
        reverse('editar_perfil'),
        data=json.dumps(data_usuario_inexistente),
        content_type='application/json'
    )
    self.assertEqual(response_usuario_inexistente.status_code, 404)
    self.assertIn("erro", response_usuario_inexistente.json())
    self.assertEqual(response_usuario_inexistente.json()["erro"], "Usuário não encontrado.")

    # Cenário 4: Novo username já está em uso
    Usuario.objects.create(
        nome="Maria",
        sobrenome="Santos",
        username="mariasantos",
        senha="senha456"
    )
    data_username_em_uso = {
        "username": "joao_atualizado",
        "novo_username": "mariasantos"
    }
    response_username_em_uso = self.client.post(
        reverse('editar_perfil'),
        data=json.dumps(data_username_em_uso),
        content_type='application/json'
    )
    self.assertEqual(response_username_em_uso.status_code, 400)
    self.assertIn("erro", response_username_em_uso.json())
    self.assertEqual(response_username_em_uso.json()["erro"], "Nome de usuário já está em uso.")

    # Cenário 5: Dados inválidos no body
    response_dados_invalidos = self.client.post(
        reverse('editar_perfil'),
        data="dados inválidos",
        content_type='application/json'
    )
    self.assertEqual(response_dados_invalidos.status_code, 400)
    self.assertIn("erro", response_dados_invalidos.json())
    self.assertEqual(response_dados_invalidos.json()["erro"], "Dados enviados em formato inválido.")

    # Cenário 6: Método não permitido
    response_metodo_nao_permitido = self.client.get(reverse('editar_perfil'))
    self.assertEqual(response_metodo_nao_permitido.status_code, 405)
    self.assertIn("erro", response_metodo_nao_permitido.json())
    self.assertEqual(response_metodo_nao_permitido.json()["erro"], "Método não permitido.")
    

class BackupTests(TestCase):
    def setUp(self):
        """Configuração inicial para os testes de backup"""
        self.client = Client()
        self.backup_folder = os.path.join(settings.BASE_DIR, 'backup')
        self.temp_media_folder = os.path.join(settings.BASE_DIR, 'media')
        os.makedirs(self.backup_folder, exist_ok=True)
        os.makedirs(self.temp_media_folder, exist_ok=True)

        # Criando um arquivo ZIP válido com banco de dados e pasta media
        self.test_backup_path = os.path.join(self.backup_folder, "test_backup.zip")
        with zipfile.ZipFile(self.test_backup_path, 'w') as backup_zip:
            # Adicionando db.sqlite3
            db_path = os.path.join(settings.BASE_DIR, 'db.sqlite3')
            with open(db_path, 'wb') as db_file:
                db_file.write(b"test_db_content")
            backup_zip.write(db_path, 'db.sqlite3')

            # Adicionando pasta media
            media_test_file = os.path.join(self.temp_media_folder, 'test_file.jpg')
            with open(media_test_file, 'wb') as f:
                f.write(b"test_media_content")
            backup_zip.write(media_test_file, 'media/test_file.jpg')

    def test_exportar_backup(self):
        """Testa se o endpoint retorna um arquivo ZIP válido"""
        # Faz a requisição ao endpoint de backup
        response = self.client.get(reverse('exportar_backup'))

        # Verifica se o status da resposta é 200
        self.assertEqual(response.status_code, 200, "A resposta não retornou o status 200.")

        # Lê o conteúdo do arquivo ZIP retornado
        backup_content = b"".join(response.streaming_content)

        # Salva o conteúdo retornado para verificação adicional
        backup_file = os.path.join(self.backup_folder, "test_exported_backup.zip")
        with open(backup_file, 'wb') as f:
            f.write(backup_content)

        # Verifica se o arquivo salvo é um ZIP válido
        self.assertTrue(zipfile.is_zipfile(backup_file), "O arquivo retornado não é um ZIP válido.")

        # Remove o arquivo de teste gerado
        os.remove(backup_file)

    def test_restaurar_backup(self):
        """Testa o endpoint de restauração de backup"""
        # Simular o envio do arquivo ZIP
        with open(self.test_backup_path, 'rb') as backup_file:
            uploaded_file = SimpleUploadedFile(
                "test_backup.zip", backup_file.read(), content_type="application/zip"
            )
            response = self.client.post(
                reverse('restaurar_backup'),
                {'backup': uploaded_file},
                format='multipart'
            )

        # Verifica se o status da resposta é 200
        self.assertEqual(response.status_code, 200, f"Erro: {response.content.decode()}")

        # Verifica se a mensagem de sucesso está presente
        self.assertIn("success", response.json())
        self.assertEqual(response.json()["success"], "Backup restaurado com sucesso!")

        # Verifica se os arquivos foram restaurados corretamente
        self.assertTrue(os.path.exists(os.path.join(settings.BASE_DIR, 'db.sqlite3')))
        self.assertTrue(os.path.exists(os.path.join(self.temp_media_folder, 'test_file.jpg')))

    def tearDown(self):
        """Limpeza após os testes"""
        if os.path.exists(self.backup_folder):
            shutil.rmtree(self.backup_folder)
        if os.path.exists(self.temp_media_folder):
            shutil.rmtree(self.temp_media_folder)
    
class LimparBDTests(TestCase):
    def setUp(self):
        """Configuração inicial para o teste de limpeza do banco de dados"""
        self.client = Client()

        # Criar usuários para teste
        Usuario.objects.create(
            nome="João",
            sobrenome="Silva",
            username="joaosilva",
            senha="senha123"
        )
        Usuario.objects.create(
            nome="Maria",
            sobrenome="Santos",
            username="mariasantos",
            senha="senha456"
        )

        # Criar eventos para teste
        image = BytesIO()
        Image.new('RGB', (100, 100), color='blue').save(image, 'JPEG')
        image.seek(0)
        uploaded_image = SimpleUploadedFile("test_image.jpg", image.getvalue(), content_type="image/jpeg")

        Evento.objects.create(
            nome="Workshop Python",
            data="2025-01-15",
            horario="14:30:00",
            tipo="presencial",
            local="Centro de Convenções",
            link="https://evento.com",
            descricao="Workshop sobre Python",
            preco=150.00,
            imagem=uploaded_image
        )

        # Criar diretórios e arquivos de imagens para teste
        self.eventos_path = os.path.join(settings.MEDIA_ROOT, 'eventos')
        self.usuarios_path = os.path.join(settings.MEDIA_ROOT, 'usuarios')
        os.makedirs(self.eventos_path, exist_ok=True)
        os.makedirs(self.usuarios_path, exist_ok=True)

        with open(os.path.join(self.eventos_path, 'test_event_image.jpg'), 'wb') as f:
            f.write(b'test event image content')

        with open(os.path.join(self.usuarios_path, 'test_user_image.jpg'), 'wb') as f:
            f.write(b'test user image content')

    def test_limpar_bd(self):
        """Testa o endpoint de limpeza do banco de dados e imagens"""
        response = self.client.post(reverse('limpar_bd'))

        # Verificar resposta
        self.assertEqual(response.status_code, 200, f"Erro: {response.content.decode()}")
        self.assertIn("mensagem", response.json())
        self.assertEqual(response.json()["mensagem"], "Banco de dados e arquivos limpos com sucesso!")

        # Verificar se os registros no banco foram deletados
        self.assertEqual(Usuario.objects.count(), 0, "Usuários não foram excluídos.")
        self.assertEqual(Evento.objects.count(), 0, "Eventos não foram excluídos.")

        # Verificar se as imagens foram deletadas
        self.assertFalse(os.listdir(self.eventos_path), "Imagens de eventos não foram excluídas.")
        self.assertFalse(os.listdir(self.usuarios_path), "Imagens de usuários não foram excluídas.")

        # Verificar se as sequências foram reiniciadas
        with connection.cursor() as cursor:
            cursor.execute("SELECT seq FROM sqlite_sequence WHERE name='agenda_usuario';")
            usuario_sequence = cursor.fetchone()
            cursor.execute("SELECT seq FROM sqlite_sequence WHERE name='agenda_evento';")
            evento_sequence = cursor.fetchone()

        self.assertIsNone(usuario_sequence, "Sequência de IDs de usuários não foi reiniciada.")
        self.assertIsNone(evento_sequence, "Sequência de IDs de eventos não foi reiniciada.")

    def tearDown(self):
        """Limpeza após os testes"""
        if os.path.exists(self.eventos_path):
            for arquivo in os.listdir(self.eventos_path):
                os.remove(os.path.join(self.eventos_path, arquivo))
            os.rmdir(self.eventos_path)

        if os.path.exists(self.usuarios_path):
            for arquivo in os.listdir(self.usuarios_path):
                os.remove(os.path.join(self.usuarios_path, arquivo))
            os.rmdir(self.usuarios_path)



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
        
class ListaDesejosTests(TestCase):
    def setUp(self):
        """Configuração inicial para os testes da lista de desejos"""
        self.client = Client()

        # Criar usuário e evento para os testes
        self.usuario = Usuario.objects.create(
            nome="João",
            sobrenome="Silva",
            username="joaosilva",
            senha="senha123"
        )
        self.evento = Evento.objects.create(
            nome="Workshop Python",
            data=date(2025, 1, 15),
            horario=time(14, 30),
            tipo="presencial",
            local="Centro de Convenções",
            link="https://evento.com",
            descricao="Workshop sobre Python",
            preco=150.00
        )

    def test_adicionar_evento_lista_desejos(self):
        """Testa adicionar um evento à lista de desejos"""
        data = {
            "usuario_id": self.usuario.id,
            "evento_id": self.evento.id
        }

        response = self.client.post(
            reverse('adicionar_a_lista'),
            data=json.dumps(data),
            content_type='application/json'
        )

        # Verifica se a resposta é 201 (criado)
        self.assertEqual(response.status_code, 201)
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], "Evento adicionado à lista de desejos!")

        # Verifica se o evento foi adicionado à lista de desejos
        self.assertTrue(ListaDesejos.objects.filter(usuario=self.usuario, evento=self.evento).exists())

    def test_adicionar_evento_repetido_lista_desejos(self):
        """Testa tentar adicionar um evento repetido à lista de desejos"""
        # Adiciona o evento inicialmente
        ListaDesejos.objects.create(usuario=self.usuario, evento=self.evento)

        data = {
            "usuario_id": self.usuario.id,
            "evento_id": self.evento.id
        }

        response = self.client.post(
            reverse('adicionar_a_lista'),
            data=json.dumps(data),
            content_type='application/json'
        )

        # Verifica se a resposta é 400 (evento já na lista)
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], "Evento já está na lista de desejos!")

    def test_adicionar_evento_lista_desejos_ids_invalidos(self):
        """Testa adicionar à lista de desejos com IDs inválidos"""
        data = {
            "usuario_id": None,  # ID inválido
            "evento_id": self.evento.id
        }

        response = self.client.post(
            reverse('adicionar_a_lista'),
            data=json.dumps(data),
            content_type='application/json'
        )

        # Verifica se a resposta é 400 (erro nos IDs)
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())
        self.assertEqual(response.json()["error"], "IDs inválidos fornecidos.")

    def test_metodo_nao_permitido(self):
        """Testa método não permitido no endpoint"""
        response = self.client.get(reverse('adicionar_a_lista'))

        # Verifica se a resposta é 405 (método não permitido)
        self.assertEqual(response.status_code, 405)
        self.assertIn("error", response.json())
        self.assertEqual(response.json()["error"], "Método não permitido. Use POST.")
    
    def test_listar_lista_desejos(self):
        """Testa o endpoint de listagem da lista de desejos"""
        # Adicionando dois eventos à lista de desejos
        evento2 = Evento.objects.create(
            nome="Curso Django",
            data=date(2025, 2, 10),
            horario=time(16, 0),
            tipo="online",
            local="Zoom",
            link="https://evento.com/curso-django",
            descricao="Desenvolvimento Web com Django",
            preco=200.00
        )

        ListaDesejos.objects.create(usuario=self.usuario, evento=self.evento)
        ListaDesejos.objects.create(usuario=self.usuario, evento=evento2)

        response = self.client.get(
            reverse('listar_lista_desejos'),
            {"usuario_id": self.usuario.id}
        )

        # Verifica se o status é 200
        self.assertEqual(response.status_code, 200)

        # Verifica o conteúdo retornado
        response_data = response.json()
        self.assertIn("eventos", response_data)
        self.assertEqual(len(response_data["eventos"]), 2)

        # Verifica os detalhes dos eventos na lista de desejos
        evento1_data = response_data["eventos"][0]
        self.assertEqual(evento1_data["nome"], self.evento.nome)
        self.assertEqual(evento1_data["local"], self.evento.local)

        evento2_data = response_data["eventos"][1]
        self.assertEqual(evento2_data["nome"], evento2.nome)
        self.assertEqual(evento2_data["local"], evento2.local)
