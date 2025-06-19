from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings

# Create your models here.

#custom user manager, requires email and sets default name, last name and username
#hashes password for security
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field is required')
        extra_fields.setdefault('first_name', '.')
        extra_fields.setdefault('last_name', '.')
        extra_fields.setdefault('username', email.split('@')[0])
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)

#custom user
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length = 50)
    email = models.EmailField(unique = True)
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return "{}".format(self.email)
