from django.urls import path
from . import views

urlpatterns = [
    path("wardrobe-pa", views.dashboard, name="dashboard"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("get-started", views.create_view, name="create"),
]