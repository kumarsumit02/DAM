
console.log(process.env);
let HOST_NAME = 'localhost:8000';
if (process.env.NODE_ENV === 'production') {
	HOST_NAME = 'ec2-uw2a-d-gale-intern2019-appweb.galepartners.com:8000';
}
// const HOST_NAME = process.env.API_HOST || 'localhost:3000';
const API_PREFIX = HOST_NAME ? `//${HOST_NAME}/` : '/';

export const urls = {
	'get_organizations': `${API_PREFIX}management/organizations/`,
	'get_users': `${API_PREFIX}management/users/`,
	'get_roles': `${API_PREFIX}management/roles/`,
	'add_role' : `${API_PREFIX}management/add_role/`,
	'delete_role' : `${API_PREFIX}management/role/`,
	'update_role' : `${API_PREFIX}management/role/`,
	'get_permissions': `${API_PREFIX}management/permissions/`,
	'get_role_permissions': `${API_PREFIX}user_management/role_permissions/`,
	'add_role_permissions':`${API_PREFIX}user_management/add_role_permission/`,
	'delete_role_permissions':`${API_PREFIX}user_management/role_permission/`,
	'delete_organization': `${API_PREFIX}management/organization/`,
	'add_organization':`${API_PREFIX}management/add_organization/`,
	'update_organization':`${API_PREFIX}management/organization/`,
	'get_organization_users':`${API_PREFIX}management/organization_users/`,
	'add_organization_users':`${API_PREFIX}management/organization_user/`,
	'delete_organization_users':`${API_PREFIX}management/organization_user/`,
	'add_user':`${API_PREFIX}management/add_user/`,
	'delete_user':`${API_PREFIX}management/user/`,
	'update_user':`${API_PREFIX}management/user/`,
	'get_user_roles':`${API_PREFIX}management/user_role/`,
	'delete_user_roles':`${API_PREFIX}management/user_role/`,
	'add_user_roles':`${API_PREFIX}management/add_user_role`,
};


console.log(HOST_NAME, API_PREFIX, urls);