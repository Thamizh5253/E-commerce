from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('account.urls')),  # Include the 'account' app URLs
    # other apps...
    path('api/accounts/', include('accounts.urls')),  # Include accounts URLs

]
