
from django.contrib import admin
from django.urls import path, include
from auth_users.views import get_csrf_token
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('categories.urls')),  # Include categories app URLs
   
    path('api/', include('products.urls')), 
    path('api/auth/', include('auth_users.urls')),  # This includes all routes from app/urls.py
    path('csrf_token/', get_csrf_token),

]



