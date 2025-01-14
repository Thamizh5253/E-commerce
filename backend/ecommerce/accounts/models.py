from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    mobile_number = models.CharField(max_length=15, blank=True, null=True)

    # Set custom related_name for the 'groups' and 'user_permissions' fields
    groups = models.ManyToManyField(
        'auth.Group', related_name='user_groups', blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', related_name='user_permissions', blank=True
    )
