
import React, {Component} from 'react'
import './style.css'

import {TemplateTitle} from '../atoms/title/'
import {TemplateDesc} from '../atoms/subtitle/'



export class TemplateTitleDesc extends Component{


	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
	}

	render(){
		return(
			<div className="template-top-area">
				<div className="row">
					<div className="col-lg-12">
						<TemplateTitle name={this.props.title}/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12 sub-title">
						<TemplateDesc desc={this.props.desc}/>
					</div>
				</div>
			</div>
		)
	}
} 