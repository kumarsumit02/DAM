from django.conf.urls import url

from .views import user, org, role, user_Org, user_Role

urlpatterns = [


    # get all users list
    url(r'^users', user.UserList.as_view(), name="listUsers"),
    # post user data
    url(r'^adduser/', user.UserDetail.as_view(), name="newUser"),
    # get, put, delete user data with parameters
    url(r'^user/(?P<pk>[\w-]+)$', user.UserDetail.as_view(), name="getUser"),


    # get all the users organization data
    url(r'^userOrganizations/', user_Org.UserOrgList.as_view(),
        name="listUsersOrganization"),
    # post userOrganization data
    url(r'^adduserOrganization/', user_Org.UserOrgDetails.as_view(),
        name="PostUserOrganization"),
    # get, put, delete user data
    url(r'^userOrganization/(?P<pk>[\w-]+)/$',
        user_Org.UserOrgDetails.as_view(), name="user auth detail"),



    # get all user roles
    url(r'^userroles/', user_Role.UserRoleList.as_view(), name="listUserRole"),
    # post user_roles data
    url(r'^addUserRole/', user_Role.UserRoleDetails.as_view(), name="PostUserRole"),
    # get, put, delete user data
    url(r'^userRole/(?P<pk>[\w-]+)/$',
        user_Role.UserRoleDetails.as_view(), name="getUserRole"),



    # get all organization
    url(r'^organizations/', org.OrganizationList.as_view(), name="listUserRole"),
    # post organization data
    url(r'^addorganization/', org.OrganizationDetails.as_view(), name="PostUserRole"),
    # get, put, delete user data
    url(r'^organization/(?P<pk>[\w-]+)/$',org.OrganizationDetails.as_view(), name="getUserRole"),




    # get all roles
    url(r'^roles/', role.RoleList.as_view(), name="listRole"),
    # post new role data
    url(r'^addrole/', role.RoleDetails.as_view(), name="PostRole"),
    # get, put, delete user data
    url(r'^role/(?P<pk>[\w-]+)/$', role.RoleDetails.as_view(), name="getRole"),


]
