from tests import createAsset, createFolders, deleteFolders
from utils import Elastic

obj1 = createAsset({
    "folder_id": "F01",
    "id": "A01",
    "name": "tyres",
    "organisation_id": "O01",
    "metadata": {
        "file_type": "image",
        "status": "Active",
        "tags": "BMW ExteriorPart",
        "description": "Michelin's pilot sport series tire",
        "category": "OuterPart"
    }
})

obj2 = createAsset({
    "folder_id": "F02",
    "id": "A02",
    "name": "TDI engines",
    "organisation_id": "O01",
    "metadata": {
        "file_type": "image",
        "status": "InActive",
        "tags": "Audi Engine Part",
        "description": "1.4 TFSI",
        "category": "OutyerPart"
    }
})

obj3 = createAsset({
    "folder_id": "F01",
    "id": "A03",
    "name": "tyres",
    "organisation_id": "O01",
    "metadata": {
        "file_type": "video",
        "status": "Active",
        "tags": "BMW ExteriorPart",
        "description": "Michelin's pilot sport series tire",
        "category": "OuterPart"
    }
})

obj4 = createAsset({
    "folder_id": "F02",
    "id": "A04",
    "name": "TDI engines",
    "organisation_id": "O02",
    "metadata": {
        "file_type": "url",
        "status": "Active",
        "tags": "Audi Engine Part",
        "description": "1.4 TFSI",
        "category": "OuterPart"
    }
})

fobj1 = createFolders({
    "id": "F01",
    "name": "BMW",
    "organisation_id": "O01"
})

fobj2 = createFolders({
    "id": "F02",
    "name": "Audi",
    "organisation_id": "O02"
})

delete_obj_query = deleteFolders({
    'qid': {"folder_id":"F02"}
})

elastic_obj = Elastic()
####################################
# insert data to es
# elastic_obj.index_data(obj1)
# elastic_obj.index_data(obj2)
# elastic_obj.index_data(obj3)
# elastic_obj.index_data(obj4)
# elastic_obj.index_data(fobj1)
# elastic_obj.index_data(fobj2)
###################################
# delete from es
elastic_obj.delete_by_query(delete_obj_query)
