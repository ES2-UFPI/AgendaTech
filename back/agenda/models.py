from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    sobrenome = models.CharField(max_length=100)
    senha = models.CharField(max_length=255)  # Use hashing em produção

    def __str__(self):
        return f"{self.nome} {self.sobrenome}"

class Evento(models.Model):
    nome = models.CharField(max_length=255)
    data = models.DateField(default='2000-01-01')  # Define uma data padrão
    horario = models.TimeField(default="00:00")
    tipo = models.CharField(max_length=50, choices=[('presencial', 'Presencial'), ('online', 'Online'), ('hibrido', 'Híbrido')])
    local = models.CharField(max_length=255, default="Local não informado")
    link = models.URLField(default="", blank=True)
    descricao = models.TextField(default='Descrição não fornecida')
    imagem = models.ImageField(upload_to='eventos/', null=True, blank=True)

    def __str__(self):
        return self.nome
