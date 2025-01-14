from django.contrib import admin
from django.urls import path, include
from app.views import get_csrf_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),  # This includes all routes from app/urls.py
    path('csrf_token/', get_csrf_token),

]
