from django.conf.urls import url

from user_management.views.user import UsersList, UserDetails
from user_management.views.org import OrganizationsList, OrganizationDetails
from user_management.views.role import RolesList, RoleDetails
from user_management.views.user_org import UserOrgsList, UserOrgDetails
from user_management.views.user_role import UserRolesList, UserRoleDetails

urlpatterns = [

    # list all users list
    url(r'^users', UsersList.as_view(), name="list_users"),
    # create user data
    url(r'^add_user/', UserDetails.as_view(), name="new_user"),
    # get, put, delete user data with parameters
    url(r'^user/(?P<pk>[\w-]+)$', UserDetails.as_view(), name="user_detail"),


    # list all the users organization data
    url(r'^user_organizations/', UserOrgsList.as_view(),
        name="list_users_organization"),
    # create userOrganization data
    url(r'^add_user_organization/', UserOrgDetails.as_view(),
        name="add_user_organization"),
    # get, put, delete user data
    url(r'^userOrganization/(?P<pk>[\w-]+)/$',
        UserOrgDetails.as_view(), name="user_organization_detail"),


    # list all user roles
    url(r'^user_roles/', UserRolesList.as_view(), name="list_users_roles"),
    # create user_roles data
    url(r'^add_user_role/', UserRoleDetails.as_view(), name="new_user_role"),
    # get, put, delete user data
    url(r'^user_role/(?P<pk>[\w-]+)/$',
        UserRoleDetails.as_view(), name="user_role_detail"),


    # list all organization
    url(r'^organizations/', OrganizationsList.as_view(), name="list_organizations"),
    # create organization data
    url(r'^add_organization/', OrganizationDetails.as_view(), name="new_organization"),
    # get, put, delete user data
    url(r'^organization/(?P<pk>[\w-]+)/$', OrganizationDetails.as_view(), name="organization_detail"),


    # list all roles
    url(r'^roles/', RolesList.as_view(), name="list_role"),
    # create new role data
    url(r'^add_role/', RoleDetails.as_view(), name="new_role"),
    # get, put, delete user data
    url(r'^role/(?P<pk>[\w-]+)/$', RoleDetails.as_view(), name="role_detail"),


]
