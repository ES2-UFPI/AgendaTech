from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    home,
    teste,
    cadastrar_usuario,
    listar_usuarios,
    listar_usuarios_json,
    listar_usuario,
    cadastrar_evento,
    adicionar_a_lista,
    listar_lista_desejos,
    login_usuario,
    listar_eventos,
    listar_eventos_nome,
    editar_perfil,
    detalhe_evento,
    detalhe_evento_por_query,
    exportar_backup,
    restaurar_backup,
    limpar_bd,
)

urlpatterns = [
    # Home e Teste
    path('', views.home, name='home'),
    path('teste/', views.teste, name='teste'),

    # Usuário
    path('cadastrar_usuario/', views.cadastrar_usuario, name='cadastrar_usuario'),
    path('listar_usuarios/', views.listar_usuarios, name='listar_usuarios'),
    path('listar_usuarios_json/', views.listar_usuarios_json, name='listar_usuarios_json'),
    path('listar_usuario/', views.listar_usuario, name='listar_usuario'),
    path('login_usuario/', views.login_usuario, name='login_usuario'),
    path('editar_perfil/', views.editar_perfil, name='editar_perfil'),

    # Evento
    path('cadastrar_evento/', views.cadastrar_evento, name='cadastrar_evento'),
    path('listar_eventos/', views.listar_eventos, name='listar_eventos'),
    path('listar_eventos_nome/', views.listar_eventos_nome, name='listar_eventos_nome'),
    path('detalhe_evento/', views.detalhe_evento, name='detalhe_evento'),
    path('detalhe_evento_por_query/', views.detalhe_evento_por_query, name='detalhe_evento_por_query'),

    # Lista de Desejos
    path('adicionar_a_lista/', views.adicionar_a_lista, name='adicionar_a_lista'),
    path('listar_lista_desejos/', listar_lista_desejos, name='listar_lista_desejos'),

    # Backup e Limpeza
    path('exportar_backup/', views.exportar_backup, name='exportar_backup'),
    path('restaurar_backup/', views.restaurar_backup, name='restaurar_backup'),
    path('limpar_bd/', views.limpar_bd, name='limpar_bd'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
