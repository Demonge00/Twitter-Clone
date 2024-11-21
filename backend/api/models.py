from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


def upload_path_bg(instance, filename):
    return '/'.join(['background', str(instance.name_id), filename])


def upload_path_profile(instance, filename):
    return '/'.join(['profile', str(instance.name_id), filename])


translate = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
}


class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    name_id = models.CharField(max_length=100, unique=True)
    email = models.EmailField(_("email address"), unique=True)
    location = models.CharField(max_length=100, null=True)
    background_pick = models.ImageField(
        upload_to=upload_path_bg, blank=True, null=True)
    profile_pick = models.ImageField(
        upload_to=upload_path_profile, blank=True, null=True)
    link = models.CharField(max_length=100, null=True)
    bio = models.TextField(null=True, max_length=200)
    follows = models.IntegerField(default=0)
    followers = models.IntegerField(default=0)
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

    def joined_in(self):
        return 'Se unio en ' + translate[self.date_joined.month] + ' del año ' + str(self.date_joined.year)
