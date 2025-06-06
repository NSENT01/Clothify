from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from datetime import date

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length = 50, unique = True)
    email = models.EmailField(_('email address'), unique = True)
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'email']
    def __str__(self):
        return "{}".format(self.email)
