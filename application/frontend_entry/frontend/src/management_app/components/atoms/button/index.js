import React, {Component} from 'react'
import logo from './Alchemy-logo.png'
import './style.css'
import {ConfirmationModal, AlertModal} from '../modals/dam-modal'


export class ProfileIcon extends Component{
	render(){
		return(
			<div>
				<i className="fas fa-user-circle fa-3x" id="profile-dropdown" data-toggle="dropdown"></i>
				<ul className="dropdown-menu">
					<li><a  href="#">Manage Profile</a></li>
					<li><a  href="#">Go to your DAM</a></li>
					<li><a  href="#">Sign Out</a></li>
				</ul>
			</div>
		)
	}
}

export class Logo extends Component{
	render(){
		return(
			<div>
				<img src={logo} className="alchemy-logo"/>
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
			
			//getting data from
			let res = await this.props.get_data()
			let assign = res[0]
			let remove = res[1]
			

			if(this.props.target_id !== null){
				this.props.save_func(this.props.target_id, name, assign, remove)
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
				//calling add function
			}
		}else if(this.props.button_type === 'remove'){

			if(this.state.add_input_box){

				this.setState({add_input_box:false})
				this.props.callbackFromParent(false)
			
			}else{
				
				if(this.props.target_id !== null){
					//calling delete function
					
					this.props.delete_func(this.props.target_id)

				}
				
			}
		}else{

			console.log('not a valid button type')

		}
	}




	render(){
		let message = 'select one of the record to delete!'
		let ele = document.getElementById('new_record')
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
