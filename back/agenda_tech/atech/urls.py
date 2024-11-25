from django.urls import path
from .views import add_event, list_events, search_events

urlpatterns = [
    path('add-event/', add_event, name='add_event'),
    path('list-events/', list_events, name='list_events'),
    path('search-events/', search_events, name='search_events'),
]
