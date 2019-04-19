import React, {Component} from 'react'
import {Sidebar} from './sidebar'
import '../_settings/assets/css/dam-management-console.css'


export class NavigationComponent extends Component{
	render(){
		return(
			<div className="wrapper">
				<nav>
					<div className="row">
				        <ul className="list-unstyled">
				            <Sidebar />
				        </ul>		        
					</div>
				</nav>
			</div>   
		)
	}
}