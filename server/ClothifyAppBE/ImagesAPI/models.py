from django.db import models
from AuthAPI.models import User
from django.conf import settings

# Create your models here.

#clothing item model, identifier by user foreign key
class ClothingItem(models.Model):
    title = models.CharField(max_length=30)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    uploadItem = models.ImageField(upload_to='user_images/')
    clothingType = models.CharField(max_length=20)

    def __str__(self):
        return self.title



