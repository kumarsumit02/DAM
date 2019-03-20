from elasticsearch import Elasticsearch

ES_CLIENT = Elasticsearch([{'host': 'elasticsearch', 'port': 9200}])


class Elastic():
    # this creates the index in elastic search and
    # loads settings and mappings to your elastic search.
    # HOW to USE - obj must contain a es_config as shown ->
    # es_config = {
    #     "settings": {
    #         "index.max_ngram_diff": 18,
    #         "index.number_of_replicas": 1,
    #         "index.number_of_shards": 6,
    #         "analysis": {
    #             "filter": {
    #                 "nGram_filter": {
    #                     "type": "nGram",
    #                     "min_gram": 2,
    #                     "max_gram": 20,
    #                     "token_chars": [
    #                         "letter",
    #                         "digit",
    #                         "punctuation",
    #                         "symbol"
    #                     ]
    #                 }
    #             },
    #             "analyzer": {
    #                 "nGram_analyzer": {
    #                     "type": "custom",
    #                     "tokenizer": "whitespace",
    #                     "filter": [
    #                         "lowercase",
    #                         "asciifolding",
    #                         "nGram_filter"
    #                     ]
    #                 },
    #                 "whitespace_analyzer": {
    #                     "type": "custom",
    #                     "tokenizer": "whitespace",
    #                     "filter": [
    #                         "lowercase",
    #                         "asciifolding"
    #                     ]
    #                 }
    #             }
    #         }
    #     },
    #     'index_name': 'asset',
    #     'type_name': 'assets',
    #     'mapping': {
    #         "properties": {
    #             "folder_id": {
    #                 "type": "keyword"
    #             },
    #             "id": {
    #                 "type": "keyword"
    #             },
    #             "name": {
    #                 "type": "text",
    #                 "analyzer": "nGram_analyzer",
    #                 "search_analyzer": "whitespace_analyzer",
    #                 "boost": 5
    #             },
    #             "organisation_id": {
    #                 "type": "keyword"
    #             },
    #             "metadata": {
    #                 "properties": {
    #                     "file_type": {
    #                         "type": "keyword"
    #                     },
    #                     "status": {
    #                         "type": "keyword"
    #                     },
    #                     "tags": {
    #                         "type": "text",
    #                         "analyzer": "nGram_analyzer",
    #                         "search_analyzer": "whitespace_analyzer"
    #                     },
    #                     "description": {
    #                         "type": "text",
    #                         "analyzer": "whitespace_analyzer"
    #                     },
    #                     "category": {
    #                         "type": "text",
    #                         "analyzer": "nGram_analyzer",
    #                         "search_analyzer": "whitespace_analyzer"
    #                     }
    #                 }
    #             }
    #         }
    #     }
    # }
    # es_config file will have your Elastic Search settings, index name, doc_type and mapping.
    # your object should contain all important info such as id, data etc.data
    #
    # example of asset obj dict ->
    #     {
    #     "folder_id": "F01",
    #     "id": "A01",
    #     "name": "tyres",
    #     "organisation_id": "O01",
    #     "metadata": {
    #         "file_type": "image",
    #         "status": "Active",
    #         "tags": "BMW ExteriorPart",
    #         "description": "Michelin's pilot sport series tire",
    #         "category": "OuterPart"
    #     }
    # }
    #
    # example of folder obj dict ->
    # {
    #   "id":"F01",
    #   "name":"BMW",
    #   "organisation_id":"O01"
    # }
    #
    #
    # Create_index - adds index to es
    def create_index(self, obj):
        index_name = obj.es_config['index_name']
        ES_CLIENT.indices.create(
            index=index_name,
            body={
                "settings": obj.es_config['settings']
            }
        )
        ES_CLIENT.indices.put_mapping(
            doc_type=obj.es_config['type_name'],
            body=obj.es_config['mapping'],
            index=index_name
        )
        return True, 'Created Index'

    # delete_index - deletes an index
    def delete_index(self, obj):
        index_name = obj.es_config['index_name']
        if ES_CLIENT.indices.exists(index=index_name):
            ES_CLIENT.indices.delete(index=index_name)
            return True, 'DELETED'
        else:
            return False, 'No Such Index'

    # index_data - adds data to (index,doc_type) as mentioned in es_config
    def index_data(self, obj):
        index_name = obj.es_config['index_name']
        doc_type = obj.es_config['type_name']
        if ES_CLIENT.indices.exists(index=index_name):
            id = obj.params['id']
            body = obj.params
            ES_CLIENT.index(
                index=index_name,
                doc_type=doc_type,
                id=id,
                body=body,
            )
        else:
            self.create_index(obj)
            id = obj.params['id']
            body = obj.params
            ES_CLIENT.index(
                index=index_name,
                doc_type=doc_type, id=id,
                body=body)
        return True, 'Added Data'

    # update_data - updates data in elastic search
    def update_data(self, obj):
        index_name = obj.es_config['index_name']
        doc_type = obj.es_config['type_name']
        id = obj.params['id']
        body = obj.params
        if ES_CLIENT.indices.exists(index=index_name):
            ES_CLIENT.update(
                index=index_name,
                doc_type=doc_type,
                id=id,
                body={
                    "doc": body
                }
            )
            return True, 'Updated Data'
        else:
            return False, 'Error'

    # delete_data - deletes data from es
    def delete_data(self, obj):
        index_name = obj.es_config['index_name']
        doc_type = obj.es_config['type_name']
        id = obj.params['id']
        if ES_CLIENT.indices.exists(index=index_name):
            ES_CLIENT.delete(
                index=index_name,
                doc_type=doc_type,
                id=id)
            return True, 'Deleted Data'
        else:
            return False, 'Error'

    # delete_by_query - deletes a number of data with the same annotation.
    # To use delete by query please pass qid in your dict - qid is a unique id
    # in your mapping that you want to delete
    def delete_by_query(self, obj):
        index_name = obj.es_config['index_name']
        doc_type = obj.es_config['type_name']
        qid = obj.params['qid']
        ES_CLIENT.delete_by_query(
            index=index_name,
            doc_type=doc_type,
            body={
                "query": {"match": {qid}}})

    def primary_search(self, obj):
        index_name = obj.es_config['index_name']
        doc_type = obj.es_config['type_name']
        ES_CLIENT.delete_by_query(
            index=index_name,
            doc_type=doc_type,
            body=obj.query
        )
