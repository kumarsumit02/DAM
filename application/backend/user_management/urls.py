from django.conf.urls import url

from .views import userView, userOrg

urlpatterns = [
    url(r'^message/', userView.message, name="check Message"),
    url(r'^users', userView.UserList.as_view(), name="user list"),
    # url(r'^(?P<pk>[\w-]+)/users/$', userView.UserDetail.as_view(), name="user detail"),

    url(r'^user/(?P<pk>[\w-]+)/$', userView.UserDetail.as_view(), name="user detail"),

    url(r'^userOrg/',userOrg.userOrgList.as_view(), name="user auth. message" ),
    # url(r'^userOrg/(?P<pk>[\w-]+)/$', userOrg.userOrgDetails.as_view(), name="user auth detail"),

]
