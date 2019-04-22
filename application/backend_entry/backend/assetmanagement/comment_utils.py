from assetmanagement.serializers import StoreCommentsSerializer
from assetmanagement.serializers import RetrieveCommentSerializer
from assetmanagement.models import Comments


def store_comment(request):
    if "comment" and "asset" and "parent" in request.data:
        data_to_store = {}
        data_to_store["asset"] = request.data["asset"]
        data_to_store["comment"] = request.data["comment"]
        if request.data["parent"] == "NULL":
            pass
        else:
            data_to_store["parent"] = request.data["parent"]

        serializer = StoreCommentsSerializer(data=data_to_store)
        if serializer.is_valid():
            serializer.save()
            return "Comment Saved"
        else:
            return serializer.errors
    else:
        return "Insufficient parameter"


def retrieve_comment(request):
    if "asset" in request.query_params:
        asset = request.query_params['asset']
        try:
            instance = Comments.objects.filter(asset=asset)
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
