from django.db import models
from django.contrib.auth.models import User, Group

# model for creating organization table


class Organization(models.Model):
    # organization_id as primary_key
    organization_id = models.AutoField(primary_key=True)
    # name of the organization
    organization_name = models.CharField(max_length=40)

# model for creating role table


class Role(models.Model):
    # role_id as primary_key
    role_id = models.AutoField(primary_key=True)
    # name of the role
    role_name = models.CharField(max_length=50)

# model for creating userOrganization table
# multi-value table so a user can be a part of multiple organization


class UserOrganization(models.Model):
    class Meta:
        # creating composite key
        unique_together = (('organization_id', 'user_id'),)
    # refrence user_id to Django User model id as ForeignKey
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    # refrence organization_id to Organization model organization_id as ForeignKey
    organization_id = models.ForeignKey(Organization, on_delete=models.CASCADE)

# model for creating UserRoles table
# multi-value table so user can have multiple roles


class UserRole(models.Model):
    class Meta:
        # creating composite key
        unique_together = (('user_id', 'role_id'),)
    # refrence user_id to Django User model id as ForeignKey
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    # refrence role_id to Role model role_id as ForeignKey
    role_id = models.ForeignKey(Group, on_delete=models.CASCADE)
