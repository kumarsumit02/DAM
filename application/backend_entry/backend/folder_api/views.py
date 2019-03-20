from rest_framework.views import APIView
from rest_framework.response import Response
from folder_api.models import Folders
from folder_api.serializers import FolderSerializer
from folder_api.helpers.folder_helper import initialize, update_child, get_folder_by_id
# Create your views here.


class FolderApi(APIView):

    def get(self, request):
        # This API will return the JSON object containing the folder structure

        key = request.query_params.get('id')

        # store the root folders
        root = []
        if key is None:
            # add the empty child field to every folder
            folder_list = initialize(key)

            # create the hierarchical structure of folders
            folder_list = update_child(folder_list)

            # store the list
            for instance in folder_list:
                if instance['parent'] is None:
                    root.append(instance)
        else:
            folder_list = get_folder_by_id(key)
            root = folder_list

        # return json object of root folders
        return Response(root)

    def post(self, request):
        serializer = FolderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    def put(self, request):
        pk = request.data.get("id")
        inst = Folders.objects.get(id=pk)
        ser = FolderSerializer(inst, data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)

    def delete(self, request):
        key = request.query_params.get('id')

        inst = Folders.objects.get(id=key)
        inst.delete()
        # serializer = readserial(inst)
        return Response(str(id) + "Deleted")
