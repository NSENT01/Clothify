from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('image_retrieval/', views.image_retrieval, name='image_retrieval'),
    path('image_upload/', views.image_upload, name='image_upload')
]

