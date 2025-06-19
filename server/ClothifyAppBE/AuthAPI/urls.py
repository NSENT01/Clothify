from django.urls import path, include
from . import views
from .views import GoogleLogin

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("create/", views.create_view, name="create"),
    path("profile/", views.profile_view, name="profile"),
    path('logout/', views.logout_view, name="logout"),
    path('o/', include('allauth.socialaccount.urls')),
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('google/', GoogleLogin.as_view(), name="google_login"),
    
]