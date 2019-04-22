import React, {Component} from 'react'
import {LinkComponent} from '../atoms/link/'


export class NavigationBlock extends Component{
	render(){
		return(
			<div className="wrapper">
			    <nav id="sidebar">
	  			     <ul className="list-unstyled">
	  					<LinkComponent to="/users" linktext="Users" icon="fas fa-user col-sm-2"/>
	  					<LinkComponent to="/roles" linktext="Roles" icon="fas fa-user-tag col-sm-2"/>
	              		<LinkComponent to="/organizations" linktext="Organizations" icon="fas fa-sitemap col-sm-2"/>
					  	
	            	</ul>
        		</nav>
			</div>
		)
	}
}