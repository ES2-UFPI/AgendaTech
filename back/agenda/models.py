from django.db import models
from django.contrib.auth import get_user_model 
from django.contrib.auth.models import User 

class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    room = models.CharField(max_length=255, default='global')

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f'{self.user.username}: {self.message}'
    

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    sobrenome = models.CharField(max_length=100)
    username = models.CharField(max_length=150, unique=True, default="usuario_generico")
    senha = models.CharField(max_length=255)  
    imagem = models.ImageField(upload_to='usuarios/', blank=True, null=True)  # Novo campo para imagem

    def __str__(self):
        return f"{self.nome} {self.sobrenome}"

class Evento(models.Model):
    nome = models.CharField(max_length=255)
    data = models.DateField(default='2000-01-01')  # Define uma data padrão
    horario = models.TimeField(default="00:00")
    tipo = models.CharField(max_length=50, choices=[('presencial', 'Presencial'), ('online', 'Online'), ('hibrido', 'Híbrido')])
    local = models.CharField(max_length=255, default="Local não informado")
    link = models.CharField(max_length=500)  # Em vez de models.URLField
    descricao = models.TextField(default='Descrição não fornecida')
    preco = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Novo campo
    imagem = models.ImageField(upload_to='eventos/', null=True, blank=True)

    def __str__(self):
        return self.nome

class ListaDesejos(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.usuario} - {self.evento}"