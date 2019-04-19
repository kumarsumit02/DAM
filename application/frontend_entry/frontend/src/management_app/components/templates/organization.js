import React, {Component} from 'react'
import './style.css'

import {TemplateTitleDesc} from '../molecules/template_title_desc'
import {DefaultTemplate} from '../organisms/default_template'

import {urls} from '../_settings/api_urls'

export class Organization extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			data:[],
			users:[],
			assigned_user_ids:[]
		}
		this.url = urls
	}

	componentDidMount(){
		this.get_organizations()
		this.get_users()
	}


	//getting all organizations data
	get_organizations = async() =>{
		await fetch(this.url.get_organizations)
			.then(response => response.json())
			.then(data => this.setState({
				 						 data:data
				 						}))
	}

	//getting all organizations data
	get_users = async() =>{
		await fetch(this.url.get_users)
			.then(response => response.json())
			.then(data => this.setState({
				 						 users:data
				 						}))
	}

	add_organization = async(data) =>{

		var json_data = {
		  	"name":data.toLowerCase()
		  }
		 
		const organization = await fetch(this.url.add_organization, {
		   method: 'post',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		}).then(res =>res.json())
		this.get_organizations()
	}

	delete_organization = async(org_id) =>{
		await fetch(this.url.delete_organization+org_id+'/', {
			method: 'delete',
			headers: new Headers({'Content-Type':'application/json'}),
		})
		.then((responseData)=>{
			if(responseData.status == 204){
			  	console.log("organization deleted")
			}
		})
		this.get_organizations()
	}

	update_organization = async(id, name) =>{
		var json_data = {
				  	"name":name
		}
			//calling fetch to update data into database
		await fetch(this.url.update_organization+id+'/', {
			   method: 'put',
			   headers: new Headers({'Content-Type':'application/json'}),
			   body: JSON.stringify(json_data)
		})
		this.get_organizations(id)

	}


	save_changes = async(id, name, assign, remove) =>{
		
		this.update_organization(id, name)
		this.add_organization_users(id, assign)
		this.remove_organization_users(id, remove)
		
		await this.get_organizations(id)
		this.get_organization_users(id)
	}


	remove_organization_users = async(id, revoke)=>{
		var json_data = {
		  	"user_id":revoke,
			"organization_id":id
		}
		 
		await fetch(this.url.delete_organization_users, {
		   method: 'delete',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})
	}


	get_organization_users = async(id) =>{
		
		let get_assigned_data;
		await fetch(this.url.get_organization_users+id+'/')
		.then(response => response.json())
		.then(
			(data) =>{get_assigned_data=data.users}
		)
		
		let user_ids = []
		await get_assigned_data.map((ele)=>{
			user_ids.push(ele.user_id)
		})
		
		this.setState({assigned_user_ids:user_ids})
	}

	add_organization_users = async(id, assign)=>{
		
		var json_data = {
		  	"user_id":assign,
			"organization_id":id
		}
		
		await fetch(this.url.add_organization_users, {
		   method: 'post',
		   headers: new Headers({'Content-Type':'application/json'}),
		   body: JSON.stringify(json_data)
		})	
	}


	render(){
		return(
			<div className="row">
				<TemplateTitleDesc title="Organizations"  desc="Manage Organization add their users"/>
				<DefaultTemplate data = {this.state.data} feature_name= 'orgs' target_name = 'users' target_data = {this.state.users} add_func={this.add_organization} delete_func={this.delete_organization} save_func={this.save_changes} assigned_user_ids={this.state.assigned_user_ids} get_data={this.get_organization_users}/>
			</div>
		)
	}
} 