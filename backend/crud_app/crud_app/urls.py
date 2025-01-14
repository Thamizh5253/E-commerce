from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('user_form.urls')),
    path('auth/', include('users.urls')),  # Include your authentication app's URLs

]
