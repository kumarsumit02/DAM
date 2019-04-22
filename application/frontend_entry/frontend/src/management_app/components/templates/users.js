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

		try{
			await fetch(this.url.get_users)
			.then(response => response.json())
			.then(data => this.setState({
				 						 data:data
				 						}))
		}catch(e){
			
		}
		
	}

	get_roles = async() =>{

		try{
			await fetch(this.url.get_roles)
			.then(response => response.json())
			.then(data => this.setState({
				 						 roles:data
				 						}))
		}catch(e){

		}
	}

	add_user = async(data) =>{
		console.log(data)
		var json_data = {
			"username":data.toLowerCase(),
		  	"email":data.toLowerCase()
		  }
		
		const user = await fetch(this.url.add_user, {
		   method: 'post',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})
		if(user.status === 201){
			this.get_users()
		}else{
			//alert error message
			alert('some error occurred! it may be due to the user with the same email id is already exist')
		}
	}

	

	delete_user = async(id) =>{
		
		await fetch(this.url.delete_user+id+'/', {
			method: 'delete',
			headers: new Headers({'Content-Type':'application/json'}),
		})
		.then((responseData)=>{
			if(responseData.status === 204){
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
		
		if(assign.length !== undefined)
			this.add_user_roles(id, assign)
		if(remove !== undefined)
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
		await get_assigned_data.map((ele)=>
			role_ids.push(ele.id)
		)
		
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

		let props = {
			data:this.state.data,
			feature_name:'users',
			target_name:'roles',
			target_data:this.state.roles,
			add_func:this.add_user,
			delete_func:this.delete_user, 
			save_func:this.save_changes, 
			assigned_ids:this.state.assigned_role_ids,
			get_data:this.get_user_roles
		}

		let header = {
			title:"Users",
			desc:"Manage users and their roles and organization",
		}

		return(
			<div className="row">
				<TemplateTitleDesc {...header}/>
				{/* <DefaultTemplate data = {this.state.data} feature_name= 'orgs' target_name = 'users' target_data = {this.state.users} add_func={this.add_organization} delete_func={this.delete_organization} save_func={this.save_changes} assigned_user_ids={this.state.assigned_user_ids} get_data={this.get_organization_users}/> */}
				<DefaultTemplate {...props} />
		
			</div>
		)
	}
} 