from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings  # Adicione esta linha
from django.conf.urls.static import static  # Adicione esta linha


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('atech.urls')),  
    path('', TemplateView.as_view(template_name='agenda.html'), name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
