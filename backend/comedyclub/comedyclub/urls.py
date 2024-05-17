from django.contrib import admin
from django.urls import path
from .views import add_fan, add_contact, faq_data, add_faq, about_data, update_about, login_fan, login_admin, admin_data, admin_add, count_data, create_show, shows_data, comedian_data, add_comedian, location_data, add_location

urlpatterns = [
    path('admin/', admin.site.urls),
    path('fans/add/', add_fan, name='add_fan'),
    path('fans/login/', login_fan, name='login_fan'),
    path('manager/data/', admin_data, name='admin_data'),
    path('manager/add/', admin_add, name='admin_add'),
    path('manager/login/', login_admin, name='login_admin'),
    path('count/', count_data, name='count_data'),
    path('shows/create/', create_show, name='create_show'),
    path('shows/data/', shows_data, name='shows_data'),
    path('comedian/create/', add_comedian, name='add_comedian'),
    path('comedian/data/', comedian_data, name='comedian_data'),
    path('location/add/', add_location, name='add_location'),
    path('location/data/', location_data, name='location_data'),
    path('about/update/', update_about, name='update_about'),
    path('about/data/', about_data, name='about_data'),
    path('faq/add/', add_faq, name='add_location'),
    path('faq/data/', faq_data, name='location_data'),
    path('contact/add/', add_contact, name='add_contact'),
]
