class CreateFolders():
    es_config = {
        'index_name': 'folder',
        'type_name': 'folders',
        'mapping': {
            "properties": {
                "id": {
                    "type": "keyword"
                },
                "name": {
                    "type": "text",
                    "analyzer": "nGram_analyzer",
                    "search_analyzer": "whitespace_analyzer"
                },
                "organisation_id": {
                    "type": "keyword"
                }
            }
        }
    }

    def __init__(self, params):
        self.params = params


class DeleteFolders():
    es_config = {
        'index_name': 'folder',
        'type_name': 'folders'
    }

    def __init__(self, params):
        self.params = params


class DeleteAssetsInFolders():
    es_config = {
        'index_name': 'asset',
        'type_name': 'assets'
    }

    def __init__(self, params):
        self.params = params
