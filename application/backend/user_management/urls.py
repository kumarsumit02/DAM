from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^message/', views.message, name="check Message"),
    url(r'^users/', views.UserList.as_view(), name="List Users"),
    url(r'^(?P<pk>[\w-]+)/users/$', views.UserDetail.as_view()),
]
