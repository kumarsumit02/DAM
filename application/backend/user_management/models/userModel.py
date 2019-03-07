from django.db import models
import uuid
class UserOrganization(models.Model):
    user_id = models.CharField(primary_key=True, max_length=50, default=uuid.uuid4)
    organization_id = models.CharField(max_length=10)

class UserRole(models.Model):
    user_id = models.CharField(max_length=50)
    role_id = models.CharField(max_length=10)
