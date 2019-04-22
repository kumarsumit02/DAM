import React, {Component} from 'react'

import {RightPane} from '../molecules/right_pane'
import {LeftPane} from '../molecules/left_pane'


export class DefaultTemplate extends Component{

	constructor(props){
		super(props)
		this.state={
			data:[],
			selected_id:null,
			selected_name:''
		}
	}

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
	}

	get_data_from_child = async(id, name) =>{
		await this.setState({selected_id:id, selected_name:name})
		this.props.get_data(this.state.selected_id)	
	}

	render(){
		return(
			<div className="row">
				<div className="col-lg-4 pane">
					<LeftPane callbackFromParent={this.get_data_from_child} {...this.props}/>
				</div>
				<div className="col-lg-7 pane">
					<RightPane  target_id={this.state.selected_id} name={this.state.selected_name} {...this.props}/>
				</div>
			</div>
		)
	}
}