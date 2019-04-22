class ElasticSearchCreateAsset():
    es_config = {
        'index_name': 'asset',
        'type_name': 'assets',
        'mapping': {
            "properties": {
                "folder_id": {
                    "type": "keyword"
                },
                "id": {
                    "type": "keyword"
                },
                "name": {
                    "type": "text",
                    "analyzer": "nGram_analyzer",
                    "search_analyzer": "whitespace_analyzer",
                    "boost": 5
                },
                "asset_path": {
                    "type": "text"
                },
                "thumbnail_path": {
                    "type": "text"
                },
                "metadata": {
                    "properties": {
                        "file_type": {
                            "type": "keyword"
                        },
                        "status": {
                            "type": "keyword"
                        },
                        "tags": {
                            "type": "text",
                            "analyzer": "nGram_analyzer",
                        },
                        "activate_on": {
                            "type": "date",
                        },
                        "expire_on": {
                            "type": "date",
                        }
                    }
                }
            }
        }
    }

    def __init__(self, params):
        self.params = params


class ElasticSearchUpdateAsset():
    es_config = {
        'index_name': 'asset',
        'type_name': 'assets',
    }

    def __init__(self, params):
        self.params = params


class ElasticSearchGetId():

    es_config = {
        'index_name': 'asset',
        'type_name': 'assets',
    }

    def __init__(self, params):
        self.query = params
