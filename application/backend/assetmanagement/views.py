import tika
import datetime
# from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from assetmanagement.comment_utils import store_comment
from assetmanagement.comment_utils import retrieve_comment
from assetmanagement.comment_utils import delete_comment
from assetmanagement.models import CreateAsset, CreateAssetType, CreateTags
from assetmanagement.serializers import StoreCreateAssetSerializer, StoreCreateAssetTypeSerializer, StoreAditionalMetadataSerializer, StoreAssetTagMappingSerializer, StoreCreateTagsSerializer
from assetmanagement.serializers import RetrieveCreateAssetSerializer, RetrieveCreateAssetTypeSerializer, RetrieveCreateTagsSerializer
from assetmanagement.serializers import UpdateCreateAssetSerializer

# from application.backend.assetmanagement.CommentFolder.store_comment import store


def get_metadata(asset_name):
    from tika import parser
    return parser.from_file('/application/backend/AssetManagement/Temp/' + asset_name)
# store type of asset and get its id


def get_asset_type_id(asset_type):
    try:
        read_instance = CreateAssetType.objects.get(asset_type=asset_type)
        asset_type_id = RetrieveCreateAssetTypeSerializer(read_instance)
        return asset_type_id.data['id']
    except CreateAssetType.DoesNotExist:
        new_asset_type_id = StoreCreateAssetTypeSerializer(
            data={'asset_type': asset_type})
        if new_asset_type_id.is_valid():
            new_asset_type_id.save()
            return new_asset_type_id.data['asset_type']
        else:
            return new_asset_type_id.errors
# store aditional metadata


def metadata(key, value, asset_id):
    data_to_store = {}
    data_to_store["metadata_key"] = key
    data_to_store["metadata_value"] = value
    data_to_store["asset_id"] = asset_id

    asset_serializer = StoreAditionalMetadataSerializer(data=data_to_store)
    if asset_serializer.is_valid():
        asset_serializer.save()
        return asset_serializer.data
    else:
        return asset_serializer.error
# update asset information


def update_asset_table(asset_id, activate_on, expire_on, asset_name):
    data_to_update = {}
    data_to_update["activate_on"] = activate_on
    data_to_update["expire_on"] = expire_on
    data_to_update["asset_name"] = asset_name

    try:
        instance = CreateAsset.objects.get(id=asset_id)
        serializer = UpdateCreateAssetSerializer(
            instance, data=data_to_update, partial=True)
        if serializer.is_valid():
            serializer.save()
            return serializer.data['id']
        else:
            return None
    except CreateAsset.DoesNotExist:
        return None
# update asset tags


def create_tag(tag_name):
    try:
        read_instance = CreateTags.objects.get(tag_name=tag_name)
        tag_id = RetrieveCreateTagsSerializer(read_instance)
        return tag_id.data['id']
    except CreateTags.DoesNotExist:
        new_id = StoreCreateTagsSerializer(data={'tag_name': tag_name})
        if new_id.is_valid():
            new_id.save()
            return new_id.data['id']
        else:
            return new_id.errors
# add value to Asset_tag table


def create_asset_tag(asset_id, tag_id):
    data_to_store = {}
    data_to_store["asset_id"] = asset_id
    data_to_store["tag_id"] = tag_id
    serializer = StoreAssetTagMappingSerializer(data=data_to_store)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    else:
        return serializer.errors
# Uploading Assets


class UploadAsset(APIView):

    def get(self, request, format=None):
        asset_id = self.request.query_params.get('id', None)
        if asset_id:
            # return Response("Ok yes")
            asset_id = request.query_params['id']
            try:
                instance = CreateAsset.objects.get(id=asset_id)
                serializer = RetrieveCreateAssetSerializer(instance)
                return Response(serializer.data)
            except CreateAsset.DoesNotExist:
                return Response("Id does not exists")

        else:
            # return Response("Ok NO")
            instance = CreateAsset.objects.all()
            serializer = RetrieveCreateAssetSerializer(instance, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        """cxfg"""
        if "file" and "folder_id" in request.data:
            asset = request.data['file']
            folder_id = request.data['folder_id']
            creation_date = datetime.date.today()
            asset_name = asset.name
        # save buffer data to temporory file
            new_file = open(
                '/application/backend/assetmanagement/Temp/' + asset.name, 'wb+')
            for chunk in asset.chunks():
                new_file.write(chunk)
            new_file.close()
        # call tika to get metadata
            tika.initVM()
            parsed_data = get_metadata(asset.name)
            if parsed_data["status"] == 200:
                asset_type = parsed_data["metadata"]["Content-Type"]
                # return Response(parsed)
                # size = parsed["metadata"]["File Size"]
                size = "unknown"
                # check for type if not exist then create new and get id
                asset_type_id = get_asset_type_id(asset_type)
                if(asset_type_id == asset_type):
                    asset_type_id = get_asset_type_id(asset_type)

                # store asset
                data_to_store = {}
                data_to_store["folder_id"] = folder_id
                data_to_store["asset"] = asset
                data_to_store["asset_name"] = asset_name
                data_to_store["creation_date"] = creation_date
                data_to_store["size"] = size
                data_to_store["asset_typeid"] = asset_type_id

                serializer = StoreCreateAssetSerializer(data=data_to_store)
                if serializer.is_valid():
                    serializer.save()

                    if asset_type == 'image/jpeg' or asset_type == 'image/png':
                        image_height = parsed_data["metadata"]['tiff:ImageLength']
                        image_width = parsed_data["metadata"]['tiff:ImageWidth']
                        # call to store aditional metadata
                        asset_id = serializer.data['id']
                        img_store = metadata(
                            "image_height", image_height, asset_id)
                        img_store = metadata(
                            "image_width", image_width, asset_id)
                        return Response(img_store)
                    elif asset_type == 'video/mp4':
                        video_height = parsed_data["metadata"]['tiff:ImageLength']
                        video_width = parsed_data["metadata"]['tiff:ImageWidth']
                        asset_id = serializer.data['id']
                        video_store = metadata(
                            "video_height", video_height, asset_id)
                        video_store = metadata(
                            "video_width", video_width, asset_id)
                        return Response(video_store)

                    else:
                        return Response("Diffrent asset_type")
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors)

            else:
                return Response("server busy try again lateer")
        else:
            return Response("Does not contain required parameter")

    def put(self, request, format=None):
        if "id" and "activates_on" and "expire_on" and "name" and "tags" in request.data:
            asset_id = request.data['id']
            activate_on = request.data['activates_on']
            expire_on = request.data['expire_on']
            asset_name = request.data['name']
            tag_name = request.data['tags']
            # Update asset_table
            response_asset = update_asset_table(
                asset_id, activate_on, expire_on, asset_name)
            # create tag and get id
            tag_id = create_tag(tag_name)
            # update asset_tags
            if(tag_id):
                asset_tag = create_asset_tag(asset_id, tag_id)
                return Response(asset_tag)
            else:
                return Response("Error while creating tags")
            return Response(response_asset)
        else:
            return Response("Does not contain required parameter")

    def delete(self, request, format=None):
        if "id" in request.data:
            asset_id = request.data['id']
            try:
                read_instance = CreateAsset.objects.get(id=asset_id)
                read_instance.delete()
                return Response("Deleted Succussfully")
            except CreateAsset.DoesNotExist:
                return Response("Id does not exists")
        else:
            return Response("Does not contain required parameter")


class Comments(APIView):
    def get(self, request, format=None):
        response_comment = retrieve_comment(request)
        modified_comment = []
        for child in response_comment:
            child['child'] = []
        for comment in response_comment[::-1]:
            if comment['parent_id'] is not None:
                # reslist.append(i['parent_id'])
                parent_id = comment['parent_id']
                for parent_response in response_comment:
                    if parent_response['id'] == parent_id:
                        parent_response['child'].append(comment)
            else:
                pass
        for root_element in response_comment:
            if(root_element['parent_id'] is None):
                modified_comment.append(root_element)

        return Response(modified_comment)

    def post(self, request, format=None):
        response_comment = store_comment(request)
        return Response(response_comment)

    def delete(self, request, format=None):
        response_comment = delete_comment(request)
        return Response(response_comment)
