from django.conf.urls import url

from .views import userView, userOrg

urlpatterns = [
    #check message
    url(r'^message/', userView.message, name="check Message"),
    #get all users list
    url(r'^users', userView.UserList.as_view(), name="user list"),
    #post user data
    #url(r'^user/',userOrg.UserDetail.as_view(), name="user organization message" ),
    #get, put, delete user data with parameters
    url(r'^user/(?P<pk>[\w-]+)/$', userView.UserDetail.as_view(), name="user detail"),
    #get all the users organization data
    url(r'^userOrganizations/',userOrg.userOrgList.as_view(), name="user organization message" ),
    #get, put, delete user data
    url(r'^userOrganization/(?P<pk>[\w-]+)/$', userOrg.userOrgDetails.as_view(), name="user auth detail"),

]
