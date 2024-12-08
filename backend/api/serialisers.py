from rest_framework import serializers
from api.models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['name', 'name_id', 'location',
                  'link', 'followers', 'follows', 'joined_in', 'bio', 'background_pick', 'profile_pick', 'follow']

    def get_name(self, obj):
        return obj.name


class PubInformationSerializer(serializers.ModelSerializer):
    time_elapsed = serializers.SerializerMethodField(read_only=True)
    pub_id = serializers.IntegerField(source='id')
    response_of = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Publication
        fields = ['text', 'views',
                  'publication_pick', 'time_elapsed', 'pub_id', 'response_of']

    def get_time_elapsed(self, obj):
        time = timezone.now() - obj.creation_date
        if (time.days > 7):
            return obj.creation_date.date()
        elif (time.days != 0):
            return str(time.days) + 'd'
        elif (time.seconds//3600 != 0):
            return str(time.seconds//3600) + 'h'
        elif (time.seconds//60 > 0):
            return str(time.seconds//60) + 'm'
        else:
            return str(time.seconds) + 's'

    def get_response_of(self, obj):
        if obj.response_of:
            try:
                pub = Publication.objects.get(id=obj.response_of.id)
                serialized = PubInformationSerializer(
                    pub,
                    context={**self.context}
                )
                return serialized.data
            except Publication.DoesNotExist:
                return None
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['likes'] = instance.likers.count()
        representation['retweets'] = instance.retweeters.count()
        representation['comments'] = instance.responses.count()
        if instance.creator.profile_pick:
            representation['avatar'] = instance.creator.profile_pick.url
        representation['name'] = instance.creator.name
        representation['name_id'] = instance.creator.name_id

        # Conditionals
        if self.context['owner'] in instance.retweeters.all() and self.context['owner'] != instance.creator:
            representation['reetweet_from'] = self.context['owner'].name
        if self.context['owner'] in instance.creator.follow.all() or instance.is_private is False or self.context['owner'] == instance.creator:
            representation['is_private'] = False
        else:
            representation['is_private'] = True
        if self.context['owner'] in instance.likers.all():
            representation['is_liked'] = True
        else:
            representation['is_liked'] = False
        if self.context['owner'] in instance.commented_by.all():
            representation['is_commented'] = True
        else:
            representation['is_commented'] = False
        if self.context['owner'] in instance.retweeters.all():
            representation['is_retweet'] = True
        else:
            representation['is_retweet'] = False
        if self.context['owner'] in instance.bookmarked_by.all():
            representation['is_bookmarked'] = True
        else:
            representation['is_bookmarked'] = False

        return representation
