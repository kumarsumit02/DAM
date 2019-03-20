from folder_api.models import Folders
from folder_api.serializers import FolderSerializer


def initialize(key):
    folder_list = []
    if key is None:  # This will add an empty child element to all the folders responses
        folder_obj = Folders.objects.all()
        serialized_list = FolderSerializer(folder_obj, many=True)
        for instance in serialized_list.data:
            instance.update({'child': []})
            folder_list.append(instance)
    else:  # Returns the folder of the given id
        folder_obj = Folders.objects.get(id=key)
        folder_list.append(folder_obj)

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


def get_folder_by_id(key):

    # Gets the folder and its children
    folder_list = initialize(key)
    for folder in folder_list:
        children = folder.folders_set.all()
        children_serial = FolderSerializer(children, many=True)
        folder_serial = FolderSerializer(folder)
        children_json = children_serial.data
        folder_json = folder_serial.data
        folder_list.remove(folder)
        folder_json.update({'child': []})
        folder_json['child'].append(children_json)
        folder_list.append(folder_json)
    return folder_list
