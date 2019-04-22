import React, {Component} from 'react'
import './style.css'

import {TemplateTitleDesc} from '../molecules/template_title_desc'
import {DefaultTemplate} from '../organisms/default_template'

import {urls} from '../_settings/api_urls'

export class Roles extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			data:[],
			permissions:[],
			assigned_permission_ids:[]
		}
		this.url = urls
	}

	componentDidMount(){
		this.get_roles()
		this.get_permissions()

	}

	//getting all organizations data
	get_roles = async() =>{

		try{
			await fetch(this.url.get_roles)
				.then(response => response.json())
				.then(data => this.setState({
					 						 data:data
					 						}))
		}catch(e){

		}


			//console.log(this.state.data)
	}

	//getting all permissions from database
	get_permissions = async() =>{

		try{
			await fetch(this.url.get_permissions)
				.then(response => response.json())
				.then(data => this.setState({
					 						 permissions:data
					 						}))
		}catch(e){

		}

	}


	//adding a new role to the database
	add_role = async(data) =>{
		var json_data = {
		  	"name":data.toLowerCase()
		  }
		 
		const role = await fetch(this.url.add_role, {
		   method: 'post',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})

		if(role.status === 201){
			//return the user 
			this.get_roles()
		}else{
			//alert error message
			alert('some error occurred! it may be due to the role with the same name is already exist')
		}

		
	}

	//delete a role from database
	delete_role = async(id) =>{

		await fetch(this.url.delete_role+id+'/', {
			method: 'delete',
			headers: new Headers({'Content-Type':'application/json'}),
		})
		.then((responseData)=>{
			if(responseData.status === 204){
			  	//console.log("Role deleted")
			}
		})
		this.get_roles()

	}

	update_role = async(id, name) =>{
		var json_data = {
				  	"name":name
		}
			//calling fetch to update data into database
		await fetch(this.url.update_role+id+'/', {
			   method: 'put',
			   headers: new Headers({'Content-Type':'application/json'}),
			   body: JSON.stringify(json_data)
		})
	}

	//save changes to the selected role name and permissions

	save_changes = async(id, name, assign, remove) =>{

		await this.update_role(id, name)
		if(assign.length !== undefined)
			await this.add_role_permissions(id, assign)
		if(remove.length !== undefined)
			await this.remove_role_permissions(id, remove)
		
		await this.get_roles()
		this.get_role_permissions(id)

	}

	get_role_permissions = async(id) =>{

		let get_assigned_data;
		await fetch(this.url.get_role_permissions+id+'/')
		.then(response => response.json())
		.then(
			(data) =>{get_assigned_data = data}
		)

		
		let role_ids = []
		await get_assigned_data.map((ele)=>{
			role_ids.push(ele.id)
		})
		
		this.setState({assigned_permission_ids:role_ids})

	}

	add_role_permissions = async(id, assign) =>{
		// console.log(assign)
		var json_data = {
		  	"group_id":id,
			"permission_id":assign
		}
		
		await fetch(this.url.add_role_permissions, {
		   method: 'post',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})	
	}

	remove_role_permissions = async(id, remove) =>{
		var json_data = {
		  	"group_id":id,
			"permission_id":remove
		}
		
		await fetch(this.url.delete_role_permissions, {
		   method: 'delete',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})
	}

	render(){

		let props = {
			data:this.state.data,
			feature_name:'roles',
			target_name:'permissions',
			target_data:this.state.permissions,
			add_func:this.add_role,
			delete_func:this.delete_role, 
			save_func:this.save_changes, 
			assigned_ids:this.state.assigned_permission_ids,
			get_data:this.get_role_permissions
		}

		let header = {
			title:"Roles",
			desc:"Manage Roles and their permissions",
		}


		return(
			<div className="row">
			
				<TemplateTitleDesc {...header}/>
				<DefaultTemplate {...props} />
		
			</div>
		)
	}
} 