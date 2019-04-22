console.log(process.env);
let HOST_NAME = 'localhost:8000';
if (process.env.NODE_ENV === 'production') {
	HOST_NAME = 'ec2-uw2a-d-gale-intern2019-appweb.galepartners.com:8000';
}
// const HOST_NAME = process.env.API_HOST || 'localhost:3000';
const API_PREFIX = HOST_NAME ? `//${HOST_NAME}/` : '/';

export const urls = {
	'get_organizations': `${API_PREFIX}management/organizations/`,
	'get_asset': `${API_PREFIX}asset_management/asset/?id=`,
	'delete_asset': `${API_PREFIX}asset_management/asset/?id=`,
	'get_folder': `${API_PREFIX}folders/?id=`,
	'get_asset_folder': `${API_PREFIX}asset_management/asset/?folder_id=`,
	'get_tags': `${API_PREFIX}asset_management/tags/?id=`,
	'edit_asset': `${API_PREFIX}asset_management/asset/`,
	'fetch_tags': `${API_PREFIX}asset_management/tags/?`,
	'post_tags': `${API_PREFIX}asset_management/tags/`,
	'multi_folders': `${API_PREFIX}folders/?`,
	'multi_assets': `${API_PREFIX}asset_management/asset/?`,
	'get_folders': `${API_PREFIX}folders/`,
	'media':`${API_PREFIX}media/`,
};


console.log(HOST_NAME, API_PREFIX, urls);