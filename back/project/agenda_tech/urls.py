from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from atech import views
from atech.views import add_event, list_events, search_events, agenda_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path('add-event/', add_event, name='add_event'),
    path('list-events/', list_events, name='list_events'),
    path('search-events/', search_events, name='search_events'),
    path('agenda/', agenda_view, name='agenda'),
    path('', views.agenda_view, name='home'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)