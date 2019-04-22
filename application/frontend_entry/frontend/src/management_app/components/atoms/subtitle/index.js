import React, {Component} from 'react'

import './style.css'

export class TemplateDesc extends Component{
	

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
	}

	render(){
		return(
			<span className={this.props.class!==null?this.props.class:null}>{this.props.desc}</span>
		)
	}
} 