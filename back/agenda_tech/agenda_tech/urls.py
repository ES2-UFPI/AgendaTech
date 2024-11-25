from django.contrib import admin
from django.urls import path, include  # Inclua 'include' para usar rotas de apps

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('atech.urls')),
]