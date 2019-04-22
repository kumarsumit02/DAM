import React, {Component} from 'react'

import './style.css'

export class TemplateTitle extends Component{
	
	render(){
		return(
			<h3>{this.props.name}</h3>
		)
	}
} 

export class EditableTitlebox extends Component{

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
		document.getElementById('name').value = nextProps.name
	}

	render(){
		return(
			<input type="text" className="capital-case title" id='name'/>	
		)
	}
}