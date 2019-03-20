# Readme for ELASTIC SEARCH Utils 
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
