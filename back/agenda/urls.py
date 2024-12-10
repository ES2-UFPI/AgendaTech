from django.urls import path
from . import views  # Importa views como um módulo
from .views import limpar_bd

from .views import (
    home,
    teste,
    cadastrar_usuario,
    listar_usuarios,
    listar_usuarios_json,
    cadastrar_evento,
    listar_eventos,
    limpar_bd,
)

urlpatterns = [
    path('', views.home, name='home'),
    path('teste/', views.teste, name='teste'),
    path('cadastrar_usuario/', views.cadastrar_usuario, name='cadastrar_usuario'),
    path('listar_usuarios/', views.listar_usuarios, name='listar_usuarios'),
    path('listar_usuarios_json/', views.listar_usuarios_json, name='listar_usuarios_json'),
    path('cadastrar_evento/', views.cadastrar_evento, name='cadastrar_evento'),
    path('listar_eventos/', views.listar_eventos, name='listar_eventos'),    
]