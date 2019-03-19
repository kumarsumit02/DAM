from django.contrib import admin

# Register your models here.
from assetmanagement.models import CreateAsset, CreateAssetType, AditionalMetadata, CreateTags, AssetTagMapping, Comments

admin.site.register(CreateAsset)
admin.site.register(CreateAssetType)
admin.site.register(AditionalMetadata)
admin.site.register(CreateTags)
admin.site.register(AssetTagMapping)
admin.site.register(Comments)
