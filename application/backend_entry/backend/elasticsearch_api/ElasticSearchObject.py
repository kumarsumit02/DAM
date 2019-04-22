class SearchObjectAsset():
    es_config = {
        "index_name": "asset"
    }

    def __init__(self, params):
        self.query = params


class SearchObjectFolder():
    es_config = {
        "index_name": "folder"
    }

    def __init__(self, params):
        self.query = params
