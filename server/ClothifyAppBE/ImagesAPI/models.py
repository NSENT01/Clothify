from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class ClothingItem(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    session_id = models.CharField(max_length=100)
    uploadItem = models.ImageField(upload_to='user_images/')
    clothingType = models.CharField(max_length=20)
    def __str__(self):
        return self.title


