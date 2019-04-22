from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from elasticsearch_api import search


urlpatterns = [
    # re_path('create/$', views.Create_Assets , name='create_asset'),
    url('search/', search.SearchElastic.as_view()),

]


urlpatterns = format_suffix_patterns(urlpatterns)
