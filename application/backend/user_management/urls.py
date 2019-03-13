from django.conf.urls import url

from .views import user, org, role, user_Org, user_Role

urlpatterns = [


    # get all users list
    url(r'^users', user.UserList.as_view(), name="listUsers"),
    # post user data
    url(r'^user/', user.UserDetail.as_view(), name="postUser"),
    # get, put, delete user data with parameters
    url(r'^user/(?P<pk>[\w-]+)/$',
        user.UserDetail.as_view(), name="getUser"),


    # get all the users organization data
    url(r'^userOrganizations/', user_Org.UserOrgList.as_view(),
        name="listUsersOrganization"),
    # post userOrganization data
    url(r'^userOrganization/', user_Org.UserOrgDetails.as_view(),
        name="PostUserOrganization"),
    # get, put, delete user data
    url(r'^userOrganization/(?P<pk>[\w-]+)/$',
        user_Org.UserOrgDetails.as_view(), name="user auth detail"),



    # get all user roles
    url(r'^userRoles/', user_Role.UserRoleList.as_view(), name="listUserRole"),
    # post user_roles data
    url(r'^userRole/', user_Role.UserRoleDetails.as_view(), name="PostUserRole"),
    # get, put, delete user data
    url(r'^userRole/(?P<pk>[\w-]+)/$',
        user_Role.UserRoleDetails.as_view(), name="getUserRole"),

    # get all user roles
    url(r'^organizations/', org.UserRoleList.as_view(), name="listUserRole"),
    # post user_roles data
    url(r'^organization/', org.UserRoleDetails.as_view(), name="PostUserRole"),
    # get, put, delete user data
    url(r'^organization/(?P<pk>[\w-]+)/$',
        org.UserRoleDetails.as_view(), name="getUserRole"),





]
