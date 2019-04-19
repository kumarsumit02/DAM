import React, {Component} from 'react'
import './style.css'

import {PaneButton} from '../atoms/button/'
import {SearchBox, SearchTarget} from '../atoms/card/'


export class LeftPane extends Component{

	constructor(props){
		super(props)
		this.state={
			data:[],
			selected_id:null,
			selected_name:'',
			target_data:[],
			input_box:false
		}
	}

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
		this.state.data = nextProps.data
		console.log('LeftPane')
	}

	get_child_state = async(data)=>{
		await this.setState({data:data})
	}

	get_selected_record_child = async(id, name) =>{
		this.props.callbackFromParent(id, name)
		await this.setState({selected_id:id, selected_name:name})
		console.log('get_selected_record_child - LeftPane')
	}

	get_panebutton_state = async(input_box) =>{
		await this.setState({
			input_box: input_box
		})
	}


	render(){
		return(
			<div>
				<SearchBox data={this.props.data} feature_name={this.props.feature_name} callbackFromParent={this.get_child_state}/>
				<SearchTarget data={this.state.data} feature_name = {this.props.feature_name} callbackFromParent={this.get_selected_record_child} input_box={this.state.input_box}/>
				<div className="col-md-12">
					<div className="row">	
						<PaneButton icon="fas fa-plus" button_type="add" className="col-md-6 dam-btn" title="Create organization" add_func={this.props.add_func} callbackFromParent={this.get_panebutton_state} input_box = {this.state.input_box} />
						<PaneButton icon="fas fa-minus" button_type="remove" className="col-md-6 dam-btn" title="Remove organization" target_id = {this.state.selected_id} target_name = {this.state.selected_name} input_box = {this.state.input_box} delete_func={this.props.delete_func} callbackFromParent={this.get_panebutton_state}/>			
					</div>
				</div>
			</div>
		)
	}
}