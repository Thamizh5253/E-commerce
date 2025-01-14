from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category
from ..categories.serializers import CategorySerializer

class CategoryListAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
