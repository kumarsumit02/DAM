from assetmanagement.serializers import StoreCommentsSerializer
from assetmanagement.serializers import RetrieveCommentSerializer
from assetmanagement.models import Comments


def store_comment(request):
    if "comment" and "asset_id" and "parent_id" in request.data:
        data_to_store = {}
        data_to_store["asset_id"] = request.data["asset_id"]
        data_to_store["comment"] = request.data["comment"]
        if request.data["parent_id"] == "NULL":
            pass
        else:
            data_to_store["parent_id"] = request.data["parent_id"]

        serializer = StoreCommentsSerializer(data=data_to_store)
        if serializer.is_valid():
            serializer.save()
            return "Comment Saved"
        else:
            return serializer.errors
    else:
        return "Insufficient parameter"


def retrieve_comment(request):
    if "asset_id" in request.query_params:
        asset_id = request.query_params['asset_id']
        try:
            instance = Comments.objects.filter(asset_id_id=asset_id)
            serializer = RetrieveCommentSerializer(instance, many=True)
            return serializer.data
        except Comments.DoesNotExist:
            return "Id does not exists"

    else:
        return "Insufficient parameter"


def delete_comment(request):
    if "comment_id" in request.data:
        comment_id = request.data['comment_id']
        try:
            read_instance = Comments.objects.get(id=comment_id)
            read_instance.delete()
            return "Deleted Succussfully"
        except Comments.DoesNotExist:
            read_instance = None
            return "Id does not exists"
    else:
        return "Does not contain required parameter"
