from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from bson import json_util
from db_connect import db

@csrf_exempt
def add_fan(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if db['fans'].insert_one(data):
            return JsonResponse({'success': True, 'message':'Fan added successfully'})
        else:
            return JsonResponse({'success': False, 'message':'Fan Not Added'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def login_fan(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name=db['fans'].find_one(data)
        if name:
            return JsonResponse({'success': True, 'message':'Login Success', 'name':name['name']})
        else:
            return JsonResponse({'success': False, 'message':'Details are wrong!'})
            
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def login_admin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name=db['admin'].find_one(data)
        if name:
            return JsonResponse({'success': True, 'message':'Login Success', 'name':name['name']})
        else:
            return JsonResponse({'success': False, 'message':'Details are wrong!'})
            
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def admin_data(request):
    if request.method == 'POST':
        data = list(db['admin'].find()) 
        if data:
            serialized_data = json_util.dumps(data)
            return JsonResponse({'success': True, 'message': 'Data Retrieved', 'data': serialized_data})
        else:
            return JsonResponse({'success': False, 'message': 'Details are wrong!'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})