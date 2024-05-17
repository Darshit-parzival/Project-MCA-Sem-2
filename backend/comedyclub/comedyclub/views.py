import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from bson import json_util
import os
from db_connect import db
import base64
import time

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
    
@csrf_exempt
def admin_add(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if db['admin'].insert_one(data):
            return JsonResponse({'success': True, 'message':'admin added successfully'})
        else:
            return JsonResponse({'success': False, 'message':'admin Not Added'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def count_data(request):
    if request.method == 'POST':
        ttl_admin = db['admin'].count_documents({})
        ttl_fans = db['fans'].count_documents({}) 
        ttl_comedians = db['comedians'].count_documents({}) 
        ttl_contacts = db['contacts'].count_documents({}) 
        
        return JsonResponse({'success': True, 'message': 'Data Retrieved', 'data': {'total_admin': ttl_admin, 'total_fans': ttl_fans, 'total_comedians':ttl_comedians, 'total_contacts':ttl_contacts}})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})

@csrf_exempt
def delete_show(request):
    if request.method == 'POST':
        title = request.POST.get('title')

        try:
            if db['shows'].delete_one({'title':t}):
                return JsonResponse({'success': True, 'message': 'Show deleted successfully'})
            else:
                return JsonResponse({'success': False, 'message': 'Show deleted successfully'})
                
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})

@csrf_exempt
def create_show(request):
    if request.method == 'POST':
        if all(field in request.POST for field in ['title', 'description', 'date', 'city', 'time']):
            title = request.POST['title']
            description = request.POST['description']
            date = request.POST['date']
            city = request.POST['city']
            time = request.POST['time']

            if 'image' in request.FILES:
                uploaded_image = request.FILES['image']

                timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                file_extension = os.path.splitext(uploaded_image.name)[1]
                new_filename = f"{timestamp}_CCSHOW{file_extension}"
                upload_directory = 'includes/shows/'
                os.makedirs(upload_directory, exist_ok=True)

                with open(os.path.join(upload_directory, new_filename), 'wb+') as destination:
                    for chunk in uploaded_image.chunks():
                        destination.write(chunk)
                        
                data = {
                    "title": title,
                    "description": description,
                    "date": date,
                    "city": city,
                    "time": time,
                    "image": new_filename
                }

                if db['shows'].insert_one(data):
                    return JsonResponse({'success': True, 'message': 'Show created successfully'})
                else:
                    return JsonResponse({'success': False, 'message': 'Show not created successfully'})
            else:
                return JsonResponse({'success': False, 'error': 'No image found in the request'})
        else:
            return JsonResponse({'success': False, 'error': 'Required fields (title, description, date, city, address) are missing'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def shows_data(request):
    if request.method == 'POST':
        data = list(db['shows'].find()) 
        if data:
            serialized_data = []
            for show in data:
                show_data = {
                    'title': show['title'],
                    'description': show['description'],
                    'date': show['date'],
                    'city':show['city'],
                    'time': show['time'],
                    'image_filename': show['image']
                }
                image_path = os.path.join('includes', 'shows', show['image'])
                with open(image_path, 'rb') as image_file:
                    image_data = base64.b64encode(image_file.read()).decode('utf-8')
                show_data['image_data'] = image_data
                serialized_data.append(show_data)
            return JsonResponse({'success': True, 'message': 'Data Retrieved', 'data': serialized_data})
        else:
            return JsonResponse({'success': False, 'message': 'Details are wrong!'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def add_comedian(request):
    if request.method == 'POST':
        if all(field in request.POST for field in ['name', 'description']):
            title = request.POST['name']
            description = request.POST['description']

            if 'image' in request.FILES:
                uploaded_image = request.FILES['image']

                timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

                file_extension = os.path.splitext(uploaded_image.name)[1]

                new_filename = f"{timestamp}_CCCOMEDIAN{file_extension}"

                upload_directory = 'includes/comedians/'

                os.makedirs(upload_directory, exist_ok=True)

                with open(os.path.join(upload_directory, new_filename), 'wb+') as destination:
                    for chunk in uploaded_image.chunks():
                        destination.write(chunk)
                        
                data={"name":title,
                      "description":description,
                      "image":new_filename}

                if db['comedians'].insert_one(data):
                    return JsonResponse({'success': True, 'message': 'Comedian created successfully'})
                else:
                    return JsonResponse({'success': False, 'message': 'Comedian not created successfully'})
            else:
                return JsonResponse({'success': False, 'error': 'No image found in the request'})
        else:
            return JsonResponse({'success': False, 'error': 'Required fields (title, description, date, time) are missing'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def comedian_data(request):
    if request.method == 'POST':
        data = list(db['comedians'].find()) 
        if data:
            serialized_data = []
            for show in data:
                show_data = {
                    'name': show['name'],
                    'description': show['description'],
                    'image_filename': show['image']
                }
                image_path = os.path.join('includes', 'comedians', show['image'])
                with open(image_path, 'rb') as image_file:
                    image_data = base64.b64encode(image_file.read()).decode('utf-8')
                show_data['image_data'] = image_data
                serialized_data.append(show_data)
            return JsonResponse({'success': True, 'message': 'Data Retrieved', 'data': serialized_data})
        else:
            return JsonResponse({'success': False, 'message': 'Details are wrong!'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def location_data(request):
    if request.method == 'POST':
        data = list(db['locations'].find()) 
        if data:
            serialized_data = json_util.dumps(data)
            return JsonResponse({'success': True, 'message': 'Data Retrieved', 'data': serialized_data})
        else:
            return JsonResponse({'success': False, 'message': 'Details are wrong!'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def add_location(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if db['locations'].insert_one(data):
            return JsonResponse({'success': True, 'message':'Location added successfully'})
        else:
            return JsonResponse({'success': False, 'message':'Location Not Added'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def about_data(request):
    if request.method == 'POST':
        data = list(db['about'].find()) 
        if data:
            about_value = data[0]['about']
            return JsonResponse({'success': True, 'message': 'Data Retrieved', 'about': about_value})
        else:
            return JsonResponse({'success': False, 'message': 'Details are wrong!'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def update_about(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        new_about = data.get('about')
        
        if not new_about:
            return JsonResponse({'success': False, 'message': 'No data provided to update'})
        
        try:
            result = db['about'].update_one({}, {'$set': {'about': new_about}})
            
            if result.modified_count > 0:
                return JsonResponse({'success': True, 'message': 'About updated successfully'})
            else:
                return JsonResponse({'success': False, 'message': 'No document updated'})
        except Exception as e:
            print(f"Error updating document: {e}")
            return JsonResponse({'success': False, 'message': 'An error occurred while updating'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def faq_data(request):
    if request.method == 'POST':
        data = list(db['faq'].find()) 
        if data:
            serialized_data = json_util.dumps(data)
            return JsonResponse({'success': True, 'message': 'Data Retrieved', 'data': serialized_data})
        else:
            return JsonResponse({'success': False, 'message': 'Details are wrong!'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def add_faq(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if db['faq'].insert_one(data):
            return JsonResponse({'success': True, 'message':'FAQ added successfully'})
        else:
            return JsonResponse({'success': False, 'message':'FAQ Not Added'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})
    
@csrf_exempt
def add_contact(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if db['contact'].insert_one(data):
            return JsonResponse({'success': True, 'message':'Your Message has reached us!'})
        else:
            return JsonResponse({'success': False, 'message':'Not Contacted'})
    else:
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed'})