from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    name_id = models.CharField(max_length=100, unique=True)
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    sent_verification_email = models.BooleanField(default=False)
    is_verificated = models.BooleanField(default=False)
    verification_secret = models.CharField(
        max_length=200, default=None, null=True)
    password_secret = models.CharField(
        max_length=200, default=None, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return str(self.email)
