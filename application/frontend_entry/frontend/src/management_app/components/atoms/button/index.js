import React, {Component} from 'react'
import logo from '../../_settings/assets/images/alchemy-logo.png'
import './style.css'
import {ConfirmationModal, AlertModal} from '../modals/dam-modal'


export class ProfileIcon extends Component{
	render(){
		return(
			<div>
				<i className="fas fa-user-circle fa-3x" id="profile-dropdown" data-toggle="dropdown"></i>
				<ul className="dropdown-menu">
					<li><a  href="/manage_profile">Manage Profile</a></li>
					<li><a  href="/dam">Go to your DAM</a></li>
					<li><a  href="/signout">Sign Out</a></li>
				</ul>
			</div>
		)
	}
}

export class Logo extends Component{
	render(){
		return(
			<div>
				<img src={logo} className="alchemy-logo" alt="dam_logo"/>
			</div>
		)
	}
}

export class ModuleTitle extends Component{
	render(){
		return(
			<div>
				<label className="module-title">DAM Management Console</label>
			</div>
		)
	}
}

export class PaneButton extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			add_input_box:false
		}
	}

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
		this.setState({add_input_box:this.props.input_box})
	}

	onClickHandler = async() =>{
		if(this.props.button_type === 'save'){
			let name = document.getElementById('name').value
			
			let res = await this.props.get_data()
			
			if(this.props.target_id !== null){
				this.props.save_func(this.props.target_id, name, res.assign, res.remove)
			}
		
		}else if(this.props.button_type === 'add'){

			if(!this.state.add_input_box){
				
				this.setState({add_input_box:true})
				this.props.callbackFromParent(true)

			}else{
				let input_box = document.getElementById('new_record')
		
				if(input_box !== undefined ){
					input_box.value === ''?alert('please insert data to add new record'):this.props.add_func(input_box.value);	
					this.setState({add_input_box:false})
					this.props.callbackFromParent(false)
				}
			}
		}else if(this.props.button_type === 'remove'){

			if(this.state.add_input_box){
				//hide input element
				this.setState({add_input_box:false})
				this.props.callbackFromParent(false)
			
			}else{
				
				if(this.props.target_id !== null){
					//calling delete function
					
					this.props.delete_func(this.props.target_id)

				}
				
			}
		}
	}


	render(){
		let message = 'select one of the record to delete!'
		return(
			<div>
				{		
					this.props.button_type === 'remove' && !this.state.add_input_box && this.props.target_id != null?
					<div className={this.props.className} title={this.props.title} data-toggle="modal" data-target="#confirmModal">
						<i className={this.props.icon}></i>
						<ConfirmationModal confimation_function={this.onClickHandler} target_name={this.props.target_name} />
					</div>
					:
					this.props.button_type === 'remove' && !this.state.add_input_box?
					<div className={this.props.className} title={this.props.title} data-toggle="modal" data-target="#alertModal">
						<i className={this.props.icon}></i>
						<AlertModal alert_message={message} target_name={this.props.target_name} />
					</div>
					:
					<div className={this.props.className} title={this.props.title} onClick={()=>this.onClickHandler()} >
						<i className={this.props.icon}></i>
					</div>
				}
			</div>

		)
	}
}

export class CheckBox extends Component{

	constructor(props){
		super(props)
		this.state = {
			select_all:true
		}
		this.check = false
	}

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
		this.check = nextProps.selected
	}

	on_select_all = async() =>{
		
		if(this.state.select_all){
			this.setState({
				select_all:false
			})
		}else{
			this.setState({
				select_all:true
			})
		}
		this.props.get_multi_select(this.state.select_all)
	}

	render(){
		return(
			<div className="checkbox-style-select-all">
				<input type="checkbox" onChange = {()=>this.on_select_all()} checked={this.check?true:false}/> 
			</div>
		)
	}
}

export class Filter extends Component{

	constructor (props){
		super(props)
		this.state = {
			filter_selected:-1
		}
	}
	componentWillReceiveProps = (nextProps) =>{
		this.props = nextProps
	}

	onFilterSelected = async(filter_param) =>{
		await this.setState({
			filter_selected:filter_param
		})
		this.props.callbackFromParent(this.state.filter_selected)
	}



	render(){
		return(
			<div>
				<i className="fas fa-filter" data-toggle="dropdown" aria-expanded="false"></i>
				<div className="dropdown-menu">
				 	<ul className="list-unstyled filter-dropdown">   
				    	<li  className = {this.state.filter_selected === -1?'dropdown-item highlighted':'dropdown-item'} onClick={()=>this.onFilterSelected(-1)}>All</li>
				    	<li  className = {this.state.filter_selected === 1?'dropdown-item highlighted':'dropdown-item'}onClick={()=>this.onFilterSelected(1)}>Assigned</li>
				    	<li  className = {this.state.filter_selected === 0?'dropdown-item highlighted':'dropdown-item'}onClick={()=>this.onFilterSelected(0)}>Not Assigned</li>
					</ul> 
				 </div>
			</div>
		)
	}
}
