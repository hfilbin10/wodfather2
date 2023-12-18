from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(null=False, blank=False, default="default")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
