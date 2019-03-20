from django.db import models

# Create your models here.


class CreateAssetType(models.Model):
    asset_type = models.CharField(max_length=40, null=False)


class CreateAsset(models.Model):
    folder_id = models.IntegerField(null=False)
    asset = models.FileField(null=False)
    asset_name = models.CharField(max_length=100, null=False)
    creation_date = models.DateField(null=False)
    size = models.CharField(max_length=100, null=False)
    asset_typeid = models.ForeignKey(CreateAssetType, on_delete=models.CASCADE)
    # tags = models.CharField(max_length=200,null=True)
    activate_on = models.DateField(null=True)
    expire_on = models.DateField(null=True)
    thumbnile = models.FileField(null=True)


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
    asset_id = models.ForeignKey(CreateAsset, on_delete=models.CASCADE)
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
