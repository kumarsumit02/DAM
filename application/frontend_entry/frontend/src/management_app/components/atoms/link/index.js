import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import '../../_settings/assets/css/dam-management-console.css'


export class LinkComponent extends Component{

	render(){
		return(
			<li>
				<NavLink to={this.props.to} activeClassName="selected"> 
					<i className={this.props.icon}></i>
				 	<span className="col-sm-10"> {this.props.linktext}</span>
				</NavLink>
			</li>
		)
	}
}