import React, {Component} from 'react'
import './style.css'

import {TemplateTitleDesc} from '../molecules/template_title_desc'
import {DefaultTemplate} from '../organisms/default_template'

//get all api urls
import {urls} from '../_settings/api_urls'


export class Users extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			data:[],
			roles:[],
			assigned_role_ids:[]
		}
		this.url = urls
	}

	componentDidMount(){
		this.get_users()
		this.get_roles()
	}


	//getting all organizations data
	get_users = async() =>{
		await fetch(this.url.get_users)
			.then(response => response.json())
			.then(data => this.setState({
				 						 data:data
				 						}))
	}

	get_roles = async() =>{
		await fetch(this.url.get_roles)
			.then(response => response.json())
			.then(data => this.setState({
				 						 roles:data
				 						}))
	}

	add_user = async(data) =>{
		console.log(data)
		var json_data = {
			"username":data.toLowerCase(),
		  	"email":data.toLowerCase()
		  }
		 console.log(json_data)
		
		const user = await fetch(this.url.add_user, {
		   method: 'post',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})

		this.get_users()
	}

	

	delete_user = async(id) =>{
		
		

		await fetch(this.url.delete_user+id+'/', {
			method: 'delete',
			headers: new Headers({'Content-Type':'application/json'}),
		})
		.then((responseData)=>{
			if(responseData.status == 204){
			  	console.log("user deleted")
			}
		})
		this.get_users()
	}


	update_user = async(id, email) =>{

		var json_data = {
					"username":email,
				  	"email":email
		}
			//calling fetch to update data into database
		await fetch(this.url.update_user+id+'/', {
			   method: 'put',
			   headers: new Headers({'Content-Type':'application/json'}),
			   body: JSON.stringify(json_data)
		})
		this.get_users()

	}


	save_changes = async(id, email, assign, remove) =>{
		// console.log('save_changes')
		// console.log(email)
		await this.update_user(id, email)
		this.add_user_roles(id, assign)
		this.remove_user_roles(id, remove)
		
		await this.get_users(id)
		this.get_user_roles(id)
	}


	remove_user_roles = async(id, remove)=>{
		var json_data = {
		  	"user_id":id,
			"group_id":remove
		}
		 
		await fetch(this.url.delete_user_roles, {
		   method: 'delete',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})
	}

	

	get_user_roles = async(id) =>{
		
		let get_assigned_data;
		await fetch(this.url.get_user_roles+id+'/')
		.then(response => response.json())
		.then(
			(data) =>{get_assigned_data=data}
		)
		console.log(get_assigned_data)
		
		let role_ids = []
		await get_assigned_data.map((ele)=>{
			role_ids.push(ele.id)
		})
		
		this.setState({assigned_role_ids:role_ids})
	}

	add_user_roles = async(id, assign)=>{
		
		var json_data = {
		  	"user_id":id,
			"group_id":assign
		}
		
		await fetch(this.url.add_user_roles, {
		   method: 'post',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})	
	}

	
	render(){
		return(
			<div className="row">
				<TemplateTitleDesc title="Users"  desc="Manage users and their roles and organization"/>
				<DefaultTemplate data = {this.state.data} feature_name= 'users' target_name = 'roles' target_data = {this.state.roles} add_func={this.add_user} delete_func={this.delete_user} save_func={this.save_changes} assigned_user_ids={this.state.assigned_role_ids} get_data={this.get_user_roles} />
			</div>
		)
	}
} 