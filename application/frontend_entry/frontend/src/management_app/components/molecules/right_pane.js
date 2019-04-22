import React, {Component} from 'react'
import './style.css'

import {PaneButton, CheckBox, Filter} from '../atoms/button/'
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
			name:'',
			selected_all:'',
			assigned_user_ids:[],
			filter_select:-1
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
			select_all_data:[],
			assigned_user_ids:nextProps.assigned_user_ids,
			selected_all:false
		})
	}

	//get child component data and set it to state
	get_child_state = (data)=>{
		if(this.target_name === null)
			this.setState({data:data})
		else
			this.setState({target_data:data})
	}

	//select single-single items
	get_selection = async(assign, remove) =>{
		this.assign = assign
		this.remove = remove
	}

	// select all items
	get_multi_select = async(selected_all) =>{
		await this.setState({selected_all:selected_all})

		let filter_data = []
		if(this.state.selected_all === true)
			await this.state.target_data.map((ele)=>{
				if(!this.state.assigned_user_ids.includes(ele.id)){
					filter_data.push(ele.id)	
				}		
			})	
		this.setState({select_all_data:filter_data})
	}

	filter_select_func = async(filter) =>{
		this.setState({filter_select:filter})
	}

	//return data to the child component
	get_data = () =>{
		//returning assign and remove data back
		if(this.state.selected_all !== true)
			return {'assign':this.assign, 'remove':this.remove};
		else{
			return {'assign':this.state.select_all_data, 'remove':[]};
		}
	}


	render(){

		let templateTitleProps = {
			desc:this.props.target_name,
			name:this.state.name
		}

		let searchBoxProps = {
			data:this.props.target_data,
			target_name:this.props.target_name,
			callbackFromParent:this.get_child_state
		}

		let CheckBoxProps = {
			get_multi_select:this.get_multi_select,
			selected:this.state.selected_all
		}

		let CheckSearchTargetProps = {
			target_name:this.props.target_name,
			assigned_ids:this.props.assigned_ids,
			target_data :this.state.target_data,
			callbackFromParent:this.get_selection,
			selected_all:this.state.selected_all,
			filter_select:this.state.filter_select
		}

		let PaneButtonSaveProps = {
			target_id:this.props.target_id,
			title:"Save Changes",
			save_func:this.props.save_func,
			get_data:this.get_data,
			remove:this.remove,
			get_update:this.get_update
		}

		return(

			<div>
				{
					this.props.target_id !== null?
					<div>
						<div className="row">
						<div className="col-lg-12 title">
							<TemplateTitleDesc {...templateTitleProps}/>
						</div>
						</div>
						<SearchBox className="col-md-12 right-pane" {...searchBoxProps}/>
						<div className="row">
							<div className="col-md-4 checkbox-style-select-all">	
								<CheckBox {...CheckBoxProps}/>
							</div>
							<div className="col-md-5 filter-style">	
								<Filter callbackFromParent = {this.filter_select_func}/>
							</div>
						</div>			
						<CheckSearchTarget {...CheckSearchTargetProps}/>
						<div className="col-md-12">
							<div className="row">	
								<PaneButton icon="fas fa-check" button_type="save" className="col-md-3 dam-btn"  {...PaneButtonSaveProps}/>
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