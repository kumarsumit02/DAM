from django.db import models
import uuid
class UserOrganization(models.Model):
    organization_id = models.CharField(max_length=10)
    user_id = models.CharField(max_length=50)

class UserRole(models.Model):
    user_id = models.CharField(max_length=50)
    role_id = models.CharField(max_length=10)

class Role(models.Model):
    role_id = models.CharField(max_length=50)
    role_name = models.CharField(max_length=50)
