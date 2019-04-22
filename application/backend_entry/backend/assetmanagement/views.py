import tika
import datetime
import os
# from rest_framework.decorators import api_view
from core.utils import Elastic
from assetmanagement.call_elastic_search import ElasticSearchCreateAsset, ElasticSearchUpdateAsset, ElasticSearchGetId
from rest_framework.response import Response
from rest_framework.views import APIView
from assetmanagement.comment_utils import store_comment
from assetmanagement.comment_utils import retrieve_comment
from assetmanagement.comment_utils import delete_comment
from assetmanagement.models import CreateAsset, CreateAssetType, CreateTags, AssetTagMapping
from assetmanagement.serializers import StoreCreateAssetSerializer, StoreCreateAssetTypeSerializer, StoreAditionalMetadataSerializer, StoreAssetTagMappingSerializer, StoreCreateTagsSerializer
from assetmanagement.serializers import RetrieveCreateAssetSerializer, RetrieveCreateAssetTypeSerializer, RetrieveCreateTagsSerializer
from assetmanagement.serializers import UpdateCreateAssetSerializer
from moviepy.editor import VideoFileClip
from PIL import Image

# from application.backend.assetmanagement.CommentFolder.store_comment import store


def get_metadata(asset_name):
    # store the uploaded file into new folder
    from tika import parser
    return parser.from_file('/application/backend/assetmanagement/temp/' + asset_name)
# store type of asset and get its id


def get_asset_type_id(asset_type):
    # Get the asset type id using this method
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


def metadata(key, value, asset_id):
    # store aditional metadata
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


def update_asset_table(asset_id, activate_on, expire_on, asset_name):
    # update asset information
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
            return serializer.data
        else:
            return None
    except CreateAsset.DoesNotExist:
        return "Id not found to update"


def create_tag(tag_name):
    # create new tag and update asset tags
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
            return None


def create_asset_tag(asset_id, tag_id):
    # add value to Asset_tag table

    try:
        result = AssetTagMapping.objects.get(asset_id=asset_id, tag_id=tag_id)
        return result
    except AssetTagMapping.DoesNotExist:
        data_to_store = {}
        data_to_store["asset_id"] = asset_id
        data_to_store["tag_id"] = tag_id
        serializer = StoreAssetTagMappingSerializer(data=data_to_store)
        if serializer.is_valid():
            serializer.save()
            return serializer.data
        else:
            return serializer.errors


def call_elastic_search_to_create(data, asset_type):
    elastic_search_dict = {}
    elastic_search_dict["folder_id"] = data['folder_id']
    elastic_search_dict["id"] = data['id']
    elastic_search_dict["name"] = data['asset_name']
    elastic_search_dict["asset_path"] = data['asset_path']
    elastic_search_dict["thumbnail_path"] = data['thumbnail']
    elastic_search_metadata = elastic_search_dict["metadata"] = {}
    elastic_search_metadata["file_type"] = asset_type
    elastic_search_metadata["status"] = "pending"
    elastic_search_metadata["tags"] = " "
    elastic_search_metadata["activate_on"] = data['activate_on']
    elastic_search_metadata["expire_on"] = data['expire_on']
    index_obj = ElasticSearchCreateAsset(elastic_search_dict)
    elastic_obj = Elastic()
    res = elastic_obj.index_data(index_obj)
    return res

def call_elastic_search_to_update_tag(existing_tags):
    try:
        elastic_search_dict = {}
        elastic_search_metadata = elastic_search_dict["metadata"] = {}
        elastic_search_metadata["tags"] = existing_tags
        # Call to elastic_search to update
        index_obj = ElasticSearchCreateAsset(elastic_search_dict)
        elastic_obj = Elastic()
        res = elastic_obj.update_data(index_obj)
        return res
    except:
        return "Error while updating tags"

def call_elastic_search_to_update(response_asset):
    try:
        elastic_search_dict = {}
        elastic_search_metadata = elastic_search_dict["metadata"] = {}
        elastic_search_dict["folder_id"] = response_asset['folder_id']
        elastic_search_dict["id"] = response_asset['id']
        elastic_search_dict["name"] = response_asset['asset_name']
        elastic_search_dict["asset_path"] = response_asset['asset_path']
        elastic_search_dict["thumbnail_path"] = response_asset['thumbnail']
        elastic_search_metadata["status"] = "pending"
        elastic_search_metadata["activate_on"] = response_asset['activate_on']
        elastic_search_metadata["expire_on"] = response_asset['expire_on']
        # elastic_search_metadata["tags"] = existing_tags
        # Call to elastic_search to update
        index_obj = ElasticSearchCreateAsset(elastic_search_dict)
        elastic_obj = Elastic()
        res = elastic_obj.update_data(index_obj)
        return res
    except Exception:
        return "Error while updating"


def create_thumbnail(file_path, asset_name, asset_type):
    if ((asset_type == "image/jpeg") or (asset_type == "image/png")):
        save_thumbnail_path = '/application/backend/assetmanagement/thumbnail/' + asset_name
        return_thumbnail_path = 'thumbnail/' + asset_name
        im = Image.open(file_path)
        im.thumbnail((300, 300))
        im.save(save_thumbnail_path, im.format)
        return return_thumbnail_path
    elif ((asset_type == "video/mp4") or (asset_type == "application/mp4")):
        save_thumbnail_path = '/application/backend/assetmanagement/thumbnail/' + asset_name + '.jpeg'
        return_thumbnail_path = 'thumbnail/' + asset_name + '.jpeg'
        clip = VideoFileClip(file_path)
        clip.save_frame(save_thumbnail_path)
        return return_thumbnail_path
    elif asset_type == "application/pdf":
        return_thumbnail_path = 'thumbnail/generalpdf.jpg'
        return return_thumbnail_path
    else:
        return_thumbnail_path = 'thumbnail/html.png'
        return return_thumbnail_path


def call_to_tika_library(asset, folder_id, creation_date, asset_name, file_path):
    tika.initVM()
    end_date = creation_date.replace(creation_date.year + 3)
    parsed_data = get_metadata(asset.name)
    if parsed_data["status"] == 200:
        asset_type = parsed_data["metadata"]["Content-Type"]

        # return Response(parsed)
        # size = parsed["metadata"]["File Size"]
        try:
            size = os.path.getsize(file_path)
        except Exception:
            size = "unknown"
        # check for type if not exist then create new and get id
        asset_type_id = get_asset_type_id(asset_type)
        if(asset_type_id == asset_type):
            asset_type_id = get_asset_type_id(asset_type)

        thumbnail_path = create_thumbnail(file_path, asset.name, asset_type)
        file_path = 'temp/' + asset.name
        # store asset
        data_to_store = {}
        data_to_store["folder_id"] = folder_id
        data_to_store["asset_path"] = file_path
        data_to_store["asset_name"] = asset_name
        data_to_store["creation_date"] = creation_date
        data_to_store["size"] = size
        data_to_store["asset_typeid"] = asset_type_id
        data_to_store["thumbnail"] = thumbnail_path
        data_to_store["status"] = "pending"
        data_to_store["activate_on"] = creation_date
        data_to_store["expire_on"] = end_date
        serializer = StoreCreateAssetSerializer(data=data_to_store)
        if serializer.is_valid():
            serializer.save()
            # call_to_elastic search
            elastic_search_result = call_elastic_search_to_create(serializer.data, asset_type)
            print(elastic_search_result)
            # Store Image metadata
            if asset_type == 'image/jpeg' or asset_type == 'image/png':
                image_height = parsed_data["metadata"]['tiff:ImageLength']
                image_width = parsed_data["metadata"]['tiff:ImageWidth']
                # call to store aditional metadata
                asset_id = serializer.data['id']
                img_store = metadata(
                    "image_height", image_height, asset_id)
                img_store = metadata(
                    "image_width", image_width, asset_id)
                return img_store
            # store Video metadata
            elif asset_type == 'video/mp4':
                video_height = parsed_data["metadata"]['tiff:ImageLength']
                video_width = parsed_data["metadata"]['tiff:ImageWidth']
                asset_id = serializer.data['id']
                video_store = metadata(
                    "video_height", video_height, asset_id)
                video_store = metadata(
                    "video_width", video_width, asset_id)
                return video_store

            else:
                return serializer.data
        else:
            return serializer.errors

    else:
        return "server busy try again later"


def call_to_update_assets(request):
    asset_id = request.data['id']
    activate_on = request.data['activate_on']
    expire_on = request.data['expire_on']
    asset_name = request.data['name']
    # tag_name = request.data['tags']
    # Update asset_table
    response_asset = update_asset_table(
        asset_id, activate_on, expire_on, asset_name)
    # return Response(response_asset)

    if(response_asset is 'Id not found to update' or response_asset is None):
        return "Id not found / Error"
    else:
        # create tag and get id
        # tag_id = create_tag(tag_name)
        # if(tag_id):
            # update asset_tags
            # asset_tag = create_asset_tag(asset_id, tag_id)
            # print(asset_tag)
            # Get current existing Tags from Elastic search
        search_tag = {"query": {"bool": {"must": [{"term": {"id": {"value": asset_id}}}]}}}
        index_obj = ElasticSearchGetId(search_tag)
        elastic_obj = Elastic()
        res = elastic_obj.primary_search(index_obj)
        # call elastic search to update
        elastic_serach_result = call_elastic_search_to_update(response_asset)
        
        # return Response("Elastic search updated")
        return response_asset
        # else:
        #     return "Error while creating tags"

def getTagsName(request):
    tags_id= []
    for child in request:
        tags_id.append(child["tag_id_id"])
    instance = list(CreateTags.objects.filter(id__in=tags_id).values())
    return instance

def getTagsId(request):
    id = request.GET.getlist('id', None)
    instance = list(AssetTagMapping.objects.filter(asset_id__in=id).values())
    res = getTagsName(instance)
    return res


class UploadAsset(APIView):
    # Uploading Assets by user
    def get(self, request, format=None):
       
        asset_id = self.request.GET.getlist('id', None)
        folder_id = self.request.query_params.get('folder_id', None)
        if asset_id:
            instance = list(CreateAsset.objects.filter(id__in=asset_id).values())
            if(instance):
                return Response(instance)
            return Response("Id does not exists")
        elif folder_id:
            instance = CreateAsset.objects.filter(folder_id=folder_id)
            serializer = RetrieveCreateAssetSerializer(instance, many=True)
            return Response(serializer.data)
        else:
            return Response([])

    def post(self, request, format=None):
        # when user uploads new asset
        if "file" and "folder_id" in request.data:
            asset = request.data['file']
            folder_id = request.data['folder_id']
            creation_date = datetime.date.today()
            asset_name = asset.name
            file_path = '/application/backend/assetmanagement/temp/' + asset.name
        # save buffer data to temporory file
            new_file = open(
                file_path, 'wb+')
            for chunk in asset.chunks():
                new_file.write(chunk)
            new_file.close()
        # call tika to get metadata
            result = call_to_tika_library(asset, folder_id, creation_date, asset_name, file_path)
            return Response([result])
        else:
            return Response([])

    def put(self, request, format=None):
        # To update asset and its attributes
        if "id" and "activate_on" and "expire_on" and "name" in request.data:
            res = call_to_update_assets(request)
            return Response(res)
        else:
            return Response("Does not contain required parameter")

    def delete(self, request, format=None):
        # To delete perticular asset
        asset_id = self.request.GET.getlist('id', None)
        if asset_id:
            instance = list(CreateAsset.objects.filter(id__in=asset_id).delete())
            if(instance[0]):
                # call_elastic_search to delete
                for element in asset_id:
                    elastic_search_dict = {}
                    elastic_search_dict["id"] = element
                    delete_obj = ElasticSearchUpdateAsset(elastic_search_dict)
                    elastic_obj = Elastic()
                    res = elastic_obj.delete_data(delete_obj)
                return Response("200")
            return Response("404 Id does not exists")
        else:
            return Response("Does not contain required parameter")


class Comments(APIView):
    def get(self, request, format=None):
        # To get comment based on asset Id
        response_comment = retrieve_comment(request)
        if response_comment == "Insufficient parameter":
            return Response(response_comment)
        else:
            modified_comment = []
            for child in response_comment:
                child['child'] = []
            for comment in response_comment[::-1]:
                if comment['parent'] is not None:
                    # reslist.append(i['parent_id'])
                    parent_id = comment['parent']
                    for parent_response in response_comment:
                        if parent_response['id'] == parent_id:
                            parent_response['child'].append(comment)
                else:
                    pass
            for root_element in response_comment:
                if(root_element['parent'] is None):
                    modified_comment.append(root_element)

            return Response(modified_comment)

    def post(self, request, format=None):
        # To store comments and reply to those comments
        response_comment = store_comment(request)
        return Response(response_comment)

    def delete(self, request, format=None):
        # To delete some comment based on asset Id
        response_comment = delete_comment(request)
        return Response(response_comment)

class Tag(APIView):
    def post(self, request, format=None):
        if "id" and "tag" in request.data:
            asset_id = request.data['id']
            tag_name = request.data['tag']
            tag_id = create_tag(tag_name)
            if(tag_id):
                asset_tag = create_asset_tag(asset_id, tag_id)
                # Get current existing Tags from Elastic search
                search_tag = {"query": {"bool": {"must": [{"term": {"id": {"value": asset_id}}}]}}}
                index_obj = ElasticSearchGetId(search_tag)
                elastic_obj = Elastic()
                res = elastic_obj.primary_search(index_obj)
                existing_tags = res["hits"]["hits"][0]["_source"]["metadata"]["tags"]
                existing_tags = existing_tags + ',' + tag_name
                # call elastic search to update
                elastic_serach_result = call_elastic_search_to_update_tag(existing_tags)
                # return Response("Elastic search updated")
                return Response("200 Tags created and search updated")
            else:
                return Response("500 Error while creating Tags")
        else:
            return Response("Provide valid parameter")
    def get(self, request, format=None):
        res = getTagsId(request)
        return Response(res)
    def delete(self, request, format=None):
        tag_name = self.request.GET.getlist('tag', None) 
        instance = list(CreateTags.objects.filter(tag_name__in=tag_name).delete())
        if instance[0]:
            return Response("200 Succuss")
        else:
            return Response("404 Not Found")