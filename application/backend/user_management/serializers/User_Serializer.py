
from rest_framework import serializers
from django.contrib.auth.models import User
from user_management.models.userModel import UserOrganization, UserRole, Role, Organization


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class UserOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        fields = ('user_org_id', 'user_id', 'organization_id')


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ('user_role_id', 'user_id', 'role_id')


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('role_id', 'role_name')


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('organization_id', 'organization_name')
