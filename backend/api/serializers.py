from rest_framework import serializers
from api.models import *


class UserSerializer(serializers.ModelSerializer):
    followed = serializers.SerializerMethodField(read_only=True)
    email = serializers.EmailField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False)
    name_tag = serializers.CharField(required=False)

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "name",
            "name_tag",
            "location",
            "link",
            "followers",
            "password",
            "follows",
            "joined_in",
            "bio",
            "background_pic",
            "profile_pic",
            "followed",
        ]

    def get_followed(self, obj):

        if self.context.get("requester"):
            if obj in self.context.get("requester").follow.all():
                return True
            return False
        return

    def validate(self, attrs):
        if attrs.get("email"):
            if CustomUser.objects.filter(email=attrs["email"]).exists():
                raise serializers.ValidationError({"error": "El email ya existe."})
        return attrs

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class PublicationInformationSerializer(serializers.ModelSerializer):
    views = serializers.IntegerField(read_only=True)
    time_elapsed = serializers.SerializerMethodField(read_only=True)
    pub_id = serializers.IntegerField(source="id", read_only=True)
    response_of = serializers.SerializerMethodField(read_only=True)
    exact_time = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)
    name_tag = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)
    reetweet_from = serializers.SerializerMethodField(read_only=True)
    is_private = serializers.BooleanField(write_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    is_commented = serializers.SerializerMethodField(read_only=True)
    is_retweet = serializers.SerializerMethodField(read_only=True)
    is_bookmarked = serializers.SerializerMethodField(read_only=True)
    creator = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=CustomUser.objects.all(), required=False
    )

    class Meta:
        model = Publication
        fields = [
            "text",
            "views",
            "publication_pic",
            "time_elapsed",
            "pub_id",
            "response_of",
            "exact_time",
            "likes",
            "retweets",
            "comments",
            "name",
            "name_tag",
            "avatar",
            "is_private",
            "is_liked",
            "is_commented",
            "is_retweet",
            "is_bookmarked",
            "reetweet_from",
            "creator",
        ]

    def get_time_elapsed(self, obj):
        time = timezone.now() - obj.creation_date
        if time.days > 7:
            return obj.creation_date.date()
        elif time.days != 0:
            return str(time.days) + "d"
        elif time.seconds // 3600 != 0:
            return str(time.seconds // 3600) + "h"
        elif time.seconds // 60 > 0:
            return str(time.seconds // 60) + "m"
        else:
            return str(time.seconds) + "s"

    def get_exact_time(self, obj):
        if obj.creation_date.hour < 12:
            horario = "AM"
        else:
            horario = "PM"
        if obj.creation_date.minute < 10:
            minuto = "0" + str(obj.creation_date.minute)
        else:
            minuto = str(obj.creation_date.minute)
        if obj.creation_date.hour < 10:
            return "0" + str(obj.creation_date.hour) + ":" + minuto + horario
        return str(obj.creation_date.hour) + ":" + minuto + horario

    def get_response_of(self, obj):
        if obj.response_of:
            try:
                pub = Publication.objects.get(id=obj.response_of.id)
                serialized = PublicationInformationSerializer(
                    pub, context={**self.context}
                )
                return serialized.data
            except Publication.DoesNotExist:
                return None
        return None

    def get_name(self, obj):
        return obj.creator.name

    def get_name_tag(self, obj):
        return obj.creator.name_tag

    def get_avatar(self, obj):
        if obj.creator.profile_pic:
            return obj.creator.profile_pic.url
        return None

    def get_reetweet_from(self, obj):
        if self.context.get("owner"):
            if (
                self.context.get("owner") in obj.retweeters.all()
                and self.context.get("owner") != obj.creator
            ):
                return self.context["owner"].name
        return None

    def get_is_liked(self, obj):
        owner = self.context.get("owner")
        return owner and owner in obj.likers.all()

    def get_is_commented(self, obj):
        owner = self.context.get("owner")
        return owner and owner in obj.commented_by.all()

    def get_is_retweet(self, obj):
        owner = self.context.get("owner")
        return owner and owner in obj.retweeters.all()

    def get_is_bookmarked(self, obj):
        owner = self.context.get("owner")
        return owner and owner in obj.bookmarked_by.all()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if self.context.get("owner"):
            if (
                self.context.get("owner") in instance.creator.follow.all()
                or instance.is_private is False
                or self.context.get("owner") == instance.creator
            ):
                representation["is_private"] = False
        else:
            representation["is_private"] = True

        return representation
