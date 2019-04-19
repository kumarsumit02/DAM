import React, {Component} from 'react'
import './style.css'

import {PaneButton} from '../atoms/button/'
import {SearchBox, CheckSearchTarget} from '../atoms/card/'
import {TemplateTitleDesc} from '../molecules/template_sub_titledesc'



export class RightPane extends Component{

	constructor(props){
		super(props)
		this.state={
			data:[],
			target_data:[],
			assign: [],
			remove: [],
			name:''
		}
		this.assign = []
		this.remove = []
	}

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
		this.setState({
			data:nextProps.data,
			target_data: nextProps.target_data,
			name:nextProps.name,
			data:nextProps.data
		})
		// this.state.data = nextProps.data
		// this.state.target_data = nextProps.target_data
		console.log(nextProps)
	}

	get_child_state = (data)=>{
		if(this.target_name === null)
			this.setState({data:data})
		else
			this.setState({target_data:data})
	}

	get_selection = async(assign, remove) =>{
		this.assign = assign
		this.remove = remove
	}

	get_multi_select = async(assign, remove) =>{
		//multiselect logic
		// console.log('get_multi_select')
	}

	get_data = async() =>{
		let res = [];
		res[0] = this.assign;
		res[1] = this.remove; 
		return res;
	}

	get_update = async() => {
		// this.state.
	}

	render(){

		console.log('Target'+this.props.target_id)
		return(

			<div>
				{
					this.props.target_id !== null?
					<div>
						<div className="row">
						<div className="col-lg-12 title">
							<TemplateTitleDesc desc={this.props.target_name} name={this.state.name}/>
						</div>
						</div>
						<SearchBox className="col-md-12 right-pane" data={this.props.target_data} target_name={this.props.target_name} callbackFromParent={this.get_child_state}/>
						<CheckSearchTarget target_data = {this.state.target_data} target_name={this.props.target_name} assigned_user_ids={this.props.assigned_user_ids} callbackFromParent={this.get_selection} callbackFromParentMultiSelect={this.get_multi_select}/>
						<div className="col-md-12">
							<div className="row">	
								<PaneButton icon="fas fa-check" button_type="save" className="col-md-3 dam-btn" target_id={this.props.target_id} title="Save Changes" save_func={this.props.save_func} get_data={this.get_data} remove={this.remove} get_update = {this.get_update} />
							</div>
						</div>
					</div>	
					:
					<div>
						<div className="row not-selected">
							<div className="col-lg-12">
								<i className="fas fa-users fa-8x"></i>
							</div>

						</div>
						<h3 className="not-slected-text">No record selected</h3>
							
					</div>

				}
				
			</div>

		)
	}
}