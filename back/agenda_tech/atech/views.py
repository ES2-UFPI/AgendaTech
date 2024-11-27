from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event
import json

@csrf_exempt
def add_event(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('event-name')
            date = data.get('event-date')
            location = data.get('event-location')
            description = data.get('event-description')
            
            event = Event.objects.create(name=name, date=date, location=location, description=description)
            return JsonResponse({'message': 'Evento cadastrado com sucesso!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Método inválido'}, status=405)

def list_events(request):
    events = Event.objects.all()
    events_data = [
        {
            "title": event.name,
            "start": event.date.strftime('%Y-%m-%d'),
            "end": event.date.strftime('%Y-%m-%d'),
        }
        for event in events
    ]
    return JsonResponse(events_data, safe=False)

def search_events(request):
    search_term = request.GET.get('q', '')
    events = Event.objects.filter(name__icontains=search_term)
    events_data = [
        {
            "name": event.name,
            "date": event.date.strftime('%Y-%m-%d'),
            "location": event.location,
            "description": event.description,
        }
        for event in events
    ]
    return JsonResponse(events_data, safe=False)

