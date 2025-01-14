from django.urls import path, include

urlpatterns = [
    path('api/', include('categories.urls')),  # Include categories app URLs
]
