from django.conf.urls import url

from .views import userView, userOrg, userRole

urlpatterns = [


    #get all users list
    url(r'^users', userView.UserList.as_view(), name="listUsers"),
    #post user data
    url(r'^user/',userView.UserDetail.as_view(), name="postUser" ),
    #get, put, delete user data with parameters
    url(r'^user/(?P<pk>[\w-]+)/$', userView.UserDetail.as_view(), name="getUser"),


    #get all the users organization data
    url(r'^userOrganizations/',userOrg.userOrgList.as_view(), name="listUsersOrganization" ),
    #post userOrganization data
    url(r'^userOrganization/', userOrg.userOrgDetails.as_view(), name="PostUserOrganization"),
    #get, put, delete user data
    url(r'^userOrganization/(?P<pk>[\w-]+)/$', userOrg.userOrgDetails.as_view(), name="user auth detail"),



    #get all user roles
    url(r'^userRoles/',userRole.UserRoleList.as_view(), name="listUserRole" ),
    #post user_roles data
    url(r'^userRole/', userRole.UserRoleDetails.as_view(), name="PostUserRole"),
    #get, put, delete user data
    url(r'^userRole/(?P<pk>[\w-]+)/$', userRole.UserRoleDetails.as_view(), name="getUserRole"),

]
