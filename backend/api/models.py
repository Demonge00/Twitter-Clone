import datetime
import hashlib
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


def get_path_for_bg(instance, filename):
    return "/".join(["background", str(instance.name_tag), filename])


def get_path_for_profile(instance, filename):
    return "/".join(["profile", str(instance.name_tag), filename])


def get_path_for_pub(instance, filename):
    return "/".join(["publication", str(instance.creator.name_tag), filename])


translate = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
}


class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    name_tag = models.CharField(max_length=100, unique=True)
    email = models.EmailField(_("email address"), unique=True)
    location = models.CharField(max_length=100, null=True)
    background_pic = models.ImageField(upload_to=get_path_for_bg, blank=True, null=True)
    profile_pic = models.ImageField(
        upload_to=get_path_for_profile, blank=True, null=True
    )
    link = models.CharField(max_length=100, null=True)
    bio = models.TextField(null=True, max_length=200)
    follow = models.ManyToManyField(
        "self", symmetrical=False, related_name="followed_by"
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    sent_verification_email = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    verification_secret = models.CharField(max_length=200, default=None, null=True)
    password_secret = models.CharField(max_length=200, default=None, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = CustomUserManager()

    def __str__(self):
        return str(self.email)

    def joined_in(self):
        return (
            "Se unio en "
            + translate[self.date_joined.month]
            + " del año "
            + str(self.date_joined.year)
        )

    def follows(self):
        return len(self.follow.all())

    def followers(self):
        return len(self.followed_by.all())


class Publication(models.Model):
    creator = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="publications"
    )
    text = models.TextField(max_length=300)
    creation_date = models.DateTimeField(default=timezone.now)
    likers = models.ManyToManyField(CustomUser, related_name="likes")
    response_of = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        default=None,
        related_name="responses",
    )
    retweeters = models.ManyToManyField(CustomUser, related_name="retweets")
    looked_by = models.ManyToManyField(CustomUser, related_name="Pub_looks")
    bookmarked_by = models.ManyToManyField(CustomUser, related_name="bookmarks")
    commented_by = models.ManyToManyField(CustomUser, related_name="comments")
    is_private = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    publication_pick = models.ImageField(
        upload_to=get_path_for_pub, blank=True, null=True
    )

    def __str__(self):
        return self.id

    def likes(self):
        return self.likers.count()
