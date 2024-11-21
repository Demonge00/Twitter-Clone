from rest_framework import serializers
from api.models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['name', 'name_id', 'location',
                  'link', 'followers', 'follows', 'joined_in', 'bio', 'background_pick', 'profile_pick']

    def get_name(self, obj):
        return obj.name


# class WorkplanSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Workplans
#         fields = ['date']

#     def get_name(self, obj):
#         return obj.name
