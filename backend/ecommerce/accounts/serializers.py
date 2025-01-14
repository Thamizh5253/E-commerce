from rest_framework import serializers
from django.contrib.auth.models import User

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

# accounts/serializers.py
# from rest_framework import serializers
from .models import User  # or the correct path to your custom User model

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # your custom User model
        fields = ['name', 'email', 'password', 'mobile_number']  # include the fields you want from the User model
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
