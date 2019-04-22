from django.db import models
from folder_api.models import Folders
from django.contrib.auth.models import User

# Create your models here.


class CreateAssetType(models.Model):
    asset_type = models.CharField(max_length=50, null=False)


class CreateAsset(models.Model):
    folder_id = models.ForeignKey(Folders, on_delete=models.CASCADE)
    asset_path = models.CharField(max_length=130, null=False)
    asset_name = models.CharField(max_length=130, null=False)
    creation_date = models.DateField(null=False)
    size = models.CharField(max_length=100, null=False)
    asset_typeid = models.ForeignKey(CreateAssetType, on_delete=models.CASCADE)
    activate_on = models.DateField(null=True)
    expire_on = models.DateField(null=True)
    thumbnail = models.CharField(max_length=130, null=False)
    status = models.CharField(max_length=20)


class AditionalMetadata(models.Model):
    metadata_key = models.CharField(max_length=100, null=False)
    metadata_value = models.CharField(max_length=100, null=False)
    asset_id = models.ForeignKey(CreateAsset, on_delete=models.CASCADE)


class CreateTags(models.Model):
    tag_name = models.CharField(max_length=100, null=False)


class AssetTagMapping(models.Model):
    asset_id = models.ForeignKey(CreateAsset, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(CreateTags, on_delete=models.CASCADE)


class Comments(models.Model):
    comment = models.CharField(max_length=100, null=False)
    asset = models.ForeignKey(CreateAsset, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)