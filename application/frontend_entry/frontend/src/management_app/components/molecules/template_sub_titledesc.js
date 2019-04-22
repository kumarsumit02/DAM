
import React, {Component} from 'react'
import './style.css'

import {EditableTitlebox} from '../atoms/title/'
import {TemplateDesc} from '../atoms/subtitle/'



export class TemplateTitleDesc extends Component{

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
	}

	render(){

		return(
			<div>
				<div className="row">
					<EditableTitlebox name={this.props.name}/>
				</div>
				<div className="row">
					<TemplateDesc desc={this.props.desc} class="sub-title"/>
				</div>
			</div>
		)
	}
} 