from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class SignupView(APIView):
    def post(self, request):
        # Extracting input data
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        mobile = request.data.get('mobile')
        
        # Validating inputs
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email is already taken'}, status=status.HTTP_400_BAD_REQUEST)

        if len(mobile) != 10 or not mobile.isdigit():
            return Response({'error': 'Invalid mobile number'}, status=status.HTTP_400_BAD_REQUEST)

        if not name or not email or not password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=email, password=password, email=email)
            # You can optionally save other fields like name and mobile here
            user.first_name = name
            user.profile.mobile = mobile  # Assuming you have a custom Profile model
            user.save()

            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
