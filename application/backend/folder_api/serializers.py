from rest_framework import serializers
from folder_api.models import Folders


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folders
        fields = '__all__'
