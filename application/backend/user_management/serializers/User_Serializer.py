from django.contrib.auth.models import User
from rest_framework import serializers
from user_management.models.userModel import UserOrganization, UserRole

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class UserOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        fields = ('user_id', 'organization_id')

class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ('user_id', 'role_id')
