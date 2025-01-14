from django.urls import path
from .views import ProductListView 
from .views import ProductSearchView

# from .views import product_search

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    # path('product_search/', product_search, name='product_search'),   # The search page route
    path('products/search/', ProductSearchView.as_view(), name='product_search'),

]
