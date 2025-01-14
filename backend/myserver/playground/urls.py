
from django.urls import path
from . import views
from playground.views import index

urlpatterns = [
    path('', views.hello, name='hello'),
]
