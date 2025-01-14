from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, LoginSerializer

def sign_up(request):
    return render(request, 'sign_up.html')

def sign_in(request):
    return render(request, 'sign_in.html')

from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny  # Allows any user, even unauthenticated users, to register

# Assuming you have a serializer like this to handle registration:
from .serializers import RegisterSerializer  # Adjust with the correct import for your serializer

class RegisterView(APIView):
    permission_classes = [AllowAny]  # This will allow anyone, including unauthenticated users, to access this view

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Logic for saving the user (create the user instance)
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.middleware.csrf import get_token
from django.http import JsonResponse

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=200)
        return Response(serializer.errors, status=400)



from rest_framework.permissions import IsAuthenticated

class HelloWorldView(APIView):
    permission_classes = [IsAuthenticated]  # Ensures the user is authenticated

    def get(self, request):
        return Response({"message": "Hello, World!"})
