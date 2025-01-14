from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()  # Get all products from the database
        serializer = ProductSerializer(products, many=True)  # Serialize the product data
        return Response(serializer.data, status=status.HTTP_200_OK)
