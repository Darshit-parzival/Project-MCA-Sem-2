from django.contrib import admin
from django.urls import path
from .views import add_fan, admin_generate_otp, add_contact,admin_delete, admin_update_password, comedian_update, contact_data, contact_delete, contact_reply, fan_data, fan_delete, fans_generate_otp, fans_update_password, location_delete, location_update, update_show, delete_show, faq_data, add_faq, about_data, update_about, login_fan, login_admin, admin_data, admin_add, count_data, create_show, shows_data, comedian_data, add_comedian, location_data, add_location

urlpatterns = [
    
    path('admin/', admin.site.urls),
    
    path('fans/add/', add_fan, name='add_fan'),
    path('fans/login/', login_fan, name='login_fan'),
    path('fans/data/', fan_data, name='fan_data'),
    path('fans/delete/', fan_delete, name='fan_delete'),
    path('fans/update/otp/', fans_generate_otp, name='fans_generate_otp'),
    path('fans/update/password/', fans_update_password, name='fans_update_password'),
    
    path('manager/data/', admin_data, name='admin_data'),
    path('manager/add/', admin_add, name='admin_add'),
    path('manager/delete/', admin_delete, name='admin_delete'),
    path('manager/update/otp/', admin_generate_otp, name='admin_generate_otp'),
    path('manager/update/password/', admin_update_password, name='admin_update_password'),
    path('manager/login/', login_admin, name='login_admin'),
    
    path('count/', count_data, name='count_data'),
    
    path('shows/create/', create_show, name='create_show'),
    path('shows/data/', shows_data, name='shows_data'),
    path('shows/delete/', delete_show, name='delete_show'),
    path('shows/update/', update_show, name='update_show'),
    
    path('comedian/create/', add_comedian, name='add_comedian'),
    path('comedian/update/', comedian_update, name='comedian_update'),
    path('comedian/data/', comedian_data, name='comedian_data'),
    
    path('location/add/', add_location, name='add_location'),
    path('location/data/', location_data, name='location_data'),
    path('location/delete/', location_delete, name='location_delete'),
    path('location/update/', location_update, name='location_update'),
    
    path('about/update/', update_about, name='update_about'),
    path('about/data/', about_data, name='about_data'),
    
    path('faq/add/', add_faq, name='add_location'),
    path('faq/data/', faq_data, name='location_data'),
    
    path('contact/add/', add_contact, name='add_contact'),
    path('contact/data/', contact_data, name='add_contact'),
    path('contact/delete/', contact_delete, name='contact_delete'),
    path('contact/reply/', contact_reply, name='contact_reply'),
]