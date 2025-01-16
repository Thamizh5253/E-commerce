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


from .documents import ProductDocument


class ProductSearchView(APIView):
    def get(self, request):
        # Get query parameters
        query = request.GET.get('q', '').strip()  # Query string (e.g., "dress")
        size = int(request.GET.get('size', 50))  # Limit the number of results
        min_price = request.GET.get('min_price')  # Minimum price
        max_price = request.GET.get('max_price')  # Maximum price
        category = request.GET.get('category', '').strip()  # Category name

        search = ProductDocument.search()

        # Add query for product name if present
        if query:
            search = search.query('match', name=query)

        # Add price range filter
        if min_price and max_price:
            search = search.filter('range', price={'gte': min_price, 'lte': max_price})
        elif min_price:  # Only minimum price filter
            search = search.filter('range', price={'gte': min_price})
        elif max_price:  # Only maximum price filter
            search = search.filter('range', price={'lte': max_price})

        # Add category filter if provided
        if category:
            search = search.filter('match', category__name=category)

        # Execute the search
        try:
            results = search[:size].execute()

            # Prepare the response
            product_list = [
                {
                    "id": product.id,
                    "name": product.name,
                    "category": product.category.name if product.category else None,
                    "no_of_units": product.no_of_units,
                    "price": product.price,
                    "discount_price": product.discount_price,
                }
                for product in results
            ]

            return Response(product_list, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
