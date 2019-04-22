
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from assetmanagement import views


urlpatterns = [
    # re_path('create/$', views.Create_Assets , name='create_asset'),
    url('asset/', views.UploadAsset.as_view()),
    url('comment/', views.Comments.as_view()),
    url('tags/', views.Tag.as_view()),
]


urlpatterns = format_suffix_patterns(urlpatterns)
