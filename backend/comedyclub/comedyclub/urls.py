from django.contrib import admin
from django.urls import path
from .views import add_fan

urlpatterns = [
    path('admin/', admin.site.urls),
    path('fans/add/', add_fan, name='add_fan'),
]
