from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.sign_up, name='register_html'),  # Renders the sign-up page
    path('login/', views.sign_in, name='login_html'),        # Renders the sign-in page
    path('api/register/', views.RegisterView.as_view(), name='register'),  # API endpoint for registration
    path('api/login/', views.LoginView.as_view(), name='login'),          # API endpoint for login
    path('hello/', views.HelloWorldView.as_view(), name='hello_world'),

]
