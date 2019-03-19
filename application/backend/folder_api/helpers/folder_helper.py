from folder_api.models import Folders
from folder_api.serializers import FolderSerializer


def initialize():
    # This will add an empty child element to all the folders responses
    folder_obj = Folders.objects.all()
    serialized_list = FolderSerializer(folder_obj, many=True)
    folder_list = []
    for instance in serialized_list.data:
        instance.update({'child': []})
        folder_list.append(instance)

    return folder_list


def update_child(folder_list):
    # searches for sub-directory and add to child field

    for folder in folder_list:
        inst = []
        for child in folder_list:
            if str(child['parent']) == str(folder['id']):
                inst.append(child)
        folder['child'].append(inst)
    return folder_list


def get_folder_by_id(id):

    # Gets the folder of given id
    folder_list = initialize()
    folder_list = update_child(folder_list)
    for folder in folder_list:
        if folder['id'] == id:
            return folder
