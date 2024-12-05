import datetime
import hashlib
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


def upload_path_bg(instance, filename):
    return '/'.join(['background', str(instance.name_id), filename])


def upload_path_profile(instance, filename):
    return '/'.join(['profile', str(instance.name_id), filename])


def upload_path_pub(instance, filename):
    return '/'.join(['publication', str(instance.creator.name_id), filename])


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
# Comprobar duplicado por contenidos de la imagen


def get_file_hash(file):
    hash_md5 = hashlib.md5()
    for chunk in iter(lambda: file.read(4096), b""):
        hash_md5.update(chunk)
    file.seek(0)  # Resetear el puntero del archivo
    return hash_md5.hexdigest()


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
    follow = models.ManyToManyField(
        "self", symmetrical=False, related_name="followed_by")
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

    def follows(self):
        return len(self.follow.all())

    def followers(self):
        return len(self.followed_by.all())


class Publication(models.Model):
    creator = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="publications")
    text = models.TextField(max_length=300)
    creation_date = models.DateTimeField(default=timezone.now)
    likers = models.ManyToManyField(CustomUser, related_name="likes")
    response_of = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, default=None, related_name='responses')
    retweeters = models.ManyToManyField(
        CustomUser, related_name='retweets')
    looked_by = models.ManyToManyField(CustomUser, related_name="Pub_looks")
    bookmarked_by = models.ManyToManyField(
        CustomUser, related_name="bookmarks")
    commented_by = models.ManyToManyField(
        CustomUser, related_name="comments")
    is_private = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    publication_pick = models.ImageField(
        upload_to=upload_path_pub, blank=True, null=True)
