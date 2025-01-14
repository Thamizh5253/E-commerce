from django.http import HttpResponse
from django.shortcuts import render
from .models import Student
def hello(request):
    return HttpResponse("Welcome to the Playground app!")


def index(request):
    obj =Student.objects.all()
    context = {
        'obj': obj
         }
    
    return render(request, 'index.html' , context)