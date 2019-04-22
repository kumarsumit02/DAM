from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.utils import Elastic
from elasticsearch import ConnectionError
from folder_api.models import Folders
from folder_api.serializers import FolderSerializer
from folder_api.helpers.folder_helper import (
    initialize,
    update_child,
    get_folder_by_id
)
from folder_api.folders_elasticsearch import (
    CreateFolders,
    DeleteFolders,
)
from uuid import UUID
# Create your views here.


class FolderApi(APIView):

    def get(self, request):
        # This API will return the JSON object containing the folder structure
        keys = self.request.GET.getlist("id")
        # key = request.query_params.get('id')

        # store the root folders
        root = []
        if len(keys) == 0:
            # add the empty child field to every folder
            folder_list = initialize(None)

            # create the hierarchical structure of folders
            folder_list = update_child(folder_list)

            # store the list
            for instance in folder_list:
                if instance['parent'] is None:
                    root.append(instance)
        else:
            for key in keys:
                try:
                    UUID(key, version=4)
                    folder_list = get_folder_by_id(key)
                    for folder in folder_list:
                        root.append(folder)
                    # root = folder_list
                except ValueError:
                    return Response({"message": "invalid id"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # return json object of root folders
        return Response(root, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FolderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            folder_es_obj = CreateFolders(serializer.data)
            elastic_utils_obj = Elastic()
            elastic_utils_obj.index_data(folder_es_obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        pk = request.data.get("id")
        parent = request.data.get('parent')
        try:
            UUID(pk, version=4)
        except ValueError:
            return Response({"message": "invalid id"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if parent is not None:
            try:
                UUID(parent, version=4)
            except ValueError:
                return Response({"message": "invalid parent_id"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        inst = Folders.objects.get(id=pk)
        ser = FolderSerializer(inst, data=request.data)
        if ser.is_valid():
            ser.save()
            folder_es_obj = CreateFolders(ser.data)
            elastic_utils_obj = Elastic()
            elastic_utils_obj.update_data(folder_es_obj)
            return Response(ser.data)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        keys = self.request.GET.getlist("id")
        for key in keys:
            try:
                UUID(key, version=4)
            except ValueError:
                return Response({"message": "invalid id"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            try:
                inst = Folders.objects.get(id=key)
                serializer = FolderSerializer(inst)
                folder_es_obj = DeleteFolders(serializer.data)
            except Folders.DoesNotExist:
                return Response({"message": "id does not exist"}, status=status.HTTP_204_NO_CONTENT)
            try:
                elastic_utils_obj = Elastic()
                elastic_utils_obj.delete_data(folder_es_obj)
            except ConnectionError:
                return Response({"message": "Couldn't connect to elasticsearch"})
            inst.delete()
        return Response(str(keys) + "/tDeleted")
