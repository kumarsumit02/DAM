from django.contrib.auth.models import User
from rest_framework import serializers
from user_management.models.userModel import UserOrganization

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class UserOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        fields = ('username', 'organization_id')
