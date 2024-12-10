from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.urls import reverse
from .models import Usuario, Evento
from django.db import connection
from .serializers import UsuarioSerializer, EventoSerializer
from PIL import Image
import json

ALLOWED_FORMATS = ['PNG', 'JPEG', 'JPG']
MAX_WIDTH, MAX_HEIGHT = 1920, 1080

def home(request):
    """Página inicial do backend com links estilizados para os endpoints"""
    links = [
        {"nome": "Teste", "url": reverse('teste')},
        {"nome": "Cadastrar Usuário", "url": reverse('cadastrar_usuario')},
        {"nome": "Listar Usuários", "url": reverse('listar_usuarios')},
        {"nome": "Listar Usuários (JSON)", "url": reverse('listar_usuarios_json')},
        {"nome": "Cadastrar Evento", "url": reverse('cadastrar_evento')},
        {"nome": "Listar Eventos", "url": reverse('listar_eventos')},       
    ]
    html_content = """
    <html>
    <head>
        <title>Backend da Agenda Tech</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 20px;
                color: #333;
            }
            h1 {
                color: #142f68;
                text-align: center;
            }
            ul {
                list-style: none;
                padding: 0;
            }
            li {
                margin: 10px 0;
            }
            a {
                text-decoration: none;
                color: white;
                background-color: #142f68;
                padding: 10px 15px;
                border-radius: 5px;
                display: inline-block;
                transition: background-color 0.3s;
            }
            a:hover {
                background-color: #0d2145;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            .clear-btn {
                color: white;
                background-color: red;
                padding: 10px 15px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                transition: background-color 0.3s;
            }
            .clear-btn:hover {
                background-color: darkred;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bem-vindo ao Backend da Agenda Tech!</h1>
            <ul>
    """
    for link in links:
        html_content += f'<li><a href="{link["url"]}">{link["nome"]}</a></li>'
    html_content += """
            </ul>
            <form method="post" action="/limpar_bd/">
                <button type="submit" class="clear-btn" onclick="return confirm('Tem certeza que deseja limpar o banco de dados?')">Limpar Banco de Dados</button>
            </form>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html_content)

def teste(request):
    """Endpoint de teste para verificar o funcionamento do backend"""
    data = {
        'mensagem': 'Backend está funcionando e recebendo requisições do frontend!'
    }
    return JsonResponse(data, json_dumps_params={'ensure_ascii': False})


@csrf_exempt
def cadastrar_usuario(request):
    """Cadastra um novo usuário"""
    if request.method == 'POST':
        try:
            dados = json.loads(request.body)
            usuario = Usuario.objects.create(
                nome=dados.get('nome'),
                sobrenome=dados.get('sobrenome'),
                senha=dados.get('senha')  # Atenção: Use hash para senhas em produção
            )
            return JsonResponse({
                "mensagem": "Usuário cadastrado com sucesso!",
                "nome": usuario.nome,
                "sobrenome": usuario.sobrenome
            }, status=201, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return JsonResponse({"erro": f"Erro ao cadastrar usuário: {str(e)}"}, status=400, json_dumps_params={'ensure_ascii': False})
    return JsonResponse({"erro": "Método não permitido"}, status=405, json_dumps_params={'ensure_ascii': False})


def listar_usuarios(request):
    """Lista todos os usuários"""
    if request.method == 'GET':
        try:
            usuarios = Usuario.objects.all()
            usuarios_data = [
                {'id': u.id, 'nome': u.nome, 'sobrenome': u.sobrenome}
                for u in usuarios
            ]
            return JsonResponse(usuarios_data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return JsonResponse({"erro": f"Erro ao listar usuários: {str(e)}"}, status=400, json_dumps_params={'ensure_ascii': False})
    return JsonResponse({"erro": "Método não permitido"}, status=405, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def cadastrar_evento(request):
    """Cadastra um novo evento"""
    try:
        # Captura os campos obrigatórios
        nome = request.POST.get('nome')
        data = request.POST.get('data')
        horario = request.POST.get('horario')
        tipo = request.POST.get('tipo')
        local = request.POST.get('local')
        link = request.POST.get('link')  # Novo campo obrigatório
        descricao = request.POST.get('descricao')  # Novo campo obrigatório       
        imagem = request.FILES.get('imagem')

        # Verificar se os campos obrigatórios estão preenchidos
        if not nome or not data or not horario or not tipo or not local or not link or not descricao:
            return JsonResponse({"erro": "Todos os campos obrigatórios devem ser preenchidos."}, status=400)

        # Verificar formato e dimensões da imagem (se fornecida)
        if imagem:
            try:
                with Image.open(imagem) as img:
                    if img.format.upper() not in ALLOWED_FORMATS:
                        return JsonResponse({"erro": "Formato de imagem não suportado"}, status=400)
                    if img.width > MAX_WIDTH or img.height > MAX_HEIGHT:
                        return JsonResponse({"erro": "Imagem excede as dimensões permitidas"}, status=400)
            except Exception as e:
                return JsonResponse({"erro": f"Erro ao processar a imagem: {str(e)}"}, status=400)

        # Criar o evento no banco de dados
        evento = Evento.objects.create(
            nome=nome,
            data=data,
            horario=horario,
            tipo=tipo,
            local=local,
            link=link,
            descricao=descricao,
            imagem=imagem
        )  

        return JsonResponse({"mensagem": "Evento cadastrado com sucesso!", "id": evento.id}, status=201)

    except Exception as e:
        return JsonResponse({"erro": f"Erro ao cadastrar evento: {str(e)}"}, status=400)
   
def listar_eventos(request):
    """Lista eventos com suporte a paginação"""
    try:
        eventos = Evento.objects.all().order_by('data')
        paginator = Paginator(eventos, 12)  # Paginação: 12 eventos por página
        page_number = request.GET.get('page', 1)
        page_obj = paginator.get_page(page_number)

        eventos_serializados = [
            {
                "id": evento.id,
                "nome": evento.nome,
                "data": evento.data.strftime('%Y-%m-%d') if evento.data else None,
                "horario": evento.horario.strftime('%H:%M') if evento.horario else None,
                "tipo": evento.tipo,
                "local": evento.local,
                "imagem": evento.imagem.url if evento.imagem else None,
                "link": evento.link,
                "descricao": evento.descricao,                
            }
            for evento in page_obj.object_list
        ]

        return JsonResponse({
            "eventos": eventos_serializados,
            "pagina_atual": page_obj.number,
            "total_paginas": paginator.num_pages,
        }, json_dumps_params={'ensure_ascii': False})
    except Exception as e:
        return JsonResponse({"erro": f"Erro ao listar eventos: {str(e)}"}, status=400)

def listar_usuarios_json(request):
    """Lista todos os usuários com suporte a caracteres especiais"""
    try:
        usuarios = Usuario.objects.all()
        usuarios_data = [
            {'id': u.id, 'nome': u.nome, 'sobrenome': u.sobrenome}
            for u in usuarios
        ]
        return JsonResponse(usuarios_data, safe=False, json_dumps_params={'ensure_ascii': False})
    except Exception as e:
        return JsonResponse({"erro": f"Erro ao listar usuários: {str(e)}"}, status=400)

@csrf_exempt
def limpar_bd(request):
    if request.method == 'POST':
        try:
            # Apagar todos os registros das tabelas
            Usuario.objects.all().delete()
            Evento.objects.all().delete()

            # Reiniciar sequência de IDs
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM sqlite_sequence WHERE name='agenda_usuario';")
                cursor.execute("DELETE FROM sqlite_sequence WHERE name='agenda_evento';")

            return JsonResponse({"mensagem": "Banco de dados limpo com sucesso e IDs reiniciados!"}, status=200)
        except Exception as e:
            return JsonResponse({"erro": f"Erro ao limpar o banco: {str(e)}"}, status=400)
    return JsonResponse({"erro": "Método não permitido"}, status=405)
