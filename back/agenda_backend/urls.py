from django.contrib import admin
from django.urls import path, include
from agenda.views import home, limpar_bd  # Importar as views necessárias
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),  # Página inicial
    path('limpar_bd/', limpar_bd, name='limpar_bd'),
    path('api/', include('agenda.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

