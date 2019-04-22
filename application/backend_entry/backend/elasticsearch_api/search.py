from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from core.utils import Elastic
from elasticsearch_api.ElasticSearchObject import SearchObjectAsset, SearchObjectFolder


class SearchElastic(APIView):
    def get(self, request):
        text = request.GET.get('text')
        status = request.GET.getlist('status')
        file_type = request.GET.getlist('file_type')
        es_obj = Elastic()
        all_filters = [
            {
                "terms": {
                    "metadata.status": status
                }
            },
            {
                "terms": {
                    "metadata.file_type": file_type
                }
            }
        ]

        filters = []
        # Clearing the filters which has null value
        for each_filter in all_filters:
            try:
                keys = [*each_filter['term']]
                if each_filter['term'][keys[0]] != None:
                    filters.append(each_filter)
            except:
                keys = [*each_filter['terms']]
                if len(each_filter['terms'][keys[0]]) != 0:
                    filters.append(each_filter)
        query = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "bool": {
                                "should": [
                                    {
                                        "match": {
                                            "name": {
                                                "query": text,
                                                "operator": "and",
                                                "boost": 1
                                            }
                                        }
                                    },
                                    {
                                        "match": {
                                            "metadata.tags": {
                                                "query": text,
                                                "operator": "and",
                                                "boost": 0.5
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "filter": {
                        "bool": {
                            "must": filters
                        }
                    }
                }
            }
        }
        if not filters:
            del query['query']['bool']['filter']
        asset_search = SearchObjectAsset(query)
        folder_search = SearchObjectFolder(query)

        assets = es_obj.primary_search(asset_search)
        folders = es_obj.primary_search(folder_search)
        result = {
            'asset': assets['hits']['hits'],
            'folder': folders['hits']['hits'],
            'total_results': assets['hits']['total'] + folders['hits']['total']
        }
        return Response(result)
