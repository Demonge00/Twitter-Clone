from rest_framework import serializers
from api.models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['name', 'name_id', 'email']

    def get_name(self, obj):
        return obj.name


# class WorkplanSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Workplans
#         fields = ['date']

#     def get_name(self, obj):
#         return obj.name
