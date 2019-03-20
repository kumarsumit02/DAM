from rest_framework import serializers
from assetmanagement.models import AssetTagMapping, CreateTags, CreateAsset, CreateAssetType, AditionalMetadata, Comments


class StoreCreateAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateAsset
        fields = '__all__'


class UpdateCreateAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateAsset
        fields = '__all__'


class RetrieveCreateAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateAsset
        fields = '__all__'


class StoreCreateAssetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateAssetType
        fields = ('asset_type',)


class RetrieveCreateAssetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateAssetType
        fields = ('id',)


class StoreAditionalMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AditionalMetadata
        fields = '__all__'


class RetrieveAditionalMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AditionalMetadata
        fields = '__all__'


class StoreCreateTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateTags
        fields = '__all__'


class RetrieveCreateTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateTags
        fields = ('id',)


class StoreAssetTagMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetTagMapping
        fields = '__all__'


class RetrieveAssetTagMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetTagMapping
        fields = '__all__'


class StoreCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'


class RetrieveCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
