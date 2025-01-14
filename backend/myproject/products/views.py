# products/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import AllowAny


class ProductListView(APIView):
    # permission_classes = [AllowAny]
    def get(self, request):
        # Get the 'category' query parameter if available
        category_id = request.query_params.get('category', None)
        
        # If category is provided, filter products by category, else return all products
        if category_id:
            products = Product.objects.filter(category_id=category_id)
        else:
            products = Product.objects.all()
        
        # Serialize the product data
        serializer = ProductSerializer(products, many=True)
        
        # Return the response with the serialized product data
        return Response(serializer.data, status=status.HTTP_200_OK)

# views.py

from .documents import ProductDocument

class ProductSearchView(APIView):
    # permission_classes = [AllowAny] 
    def get(self, request):
        query = request.GET.get('q', '')  # Get query from the request URL
        size = int(request.GET.get('size', 50))  # Set the max number of products to return

        if query:
            # Search for products matching the query
            products = ProductDocument.search().query('match', name=query)[:size].execute()
        else:
            # Return all products if there's no query
            products = ProductDocument.search()[:size].execute()

        # Create a list of product dictionaries to return as a JSON response
        product_list = [
            {"id": product.id, "name": product.name, "category": product.category.id ,"no_of_units":product.no_of_units ,"price": product.price, "discount_price": product.discount_price}
            for product in products
        ]
                # fields = ['id', 'name', 'category', 'no_of_units', 'price', 'discount_price']

        return Response(product_list, status=status.HTTP_200_OK)
