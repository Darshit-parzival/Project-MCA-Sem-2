from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from db_connect import db

@csrf_exempt
def add_fan(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        db['fans'].insert_one(data)
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})