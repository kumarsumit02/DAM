from django.db import models

class UserOrganization(models.Model):
    username = models.CharField(primary_key=True, max_length=50)
    organization_id = models.CharField(max_length=50)
