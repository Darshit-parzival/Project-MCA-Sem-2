from django.contrib import admin
from django.urls import path
from .views import add_fan, login_fan, login_admin, admin_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('fans/add/', add_fan, name='add_fan'),
    path('fans/login/', login_fan, name='login_fan'),
    path('manager/data/', admin_data, name='admin_data'),
    path('manager/login/', login_admin, name='login_admin'),
]
