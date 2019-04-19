import React, {Component} from 'react'
import {TopBar} from '../organisms/topbar'
import {NavigationComponent} from '../organisms/side_navigation_bar'


export class AppRoute extends Component{
	render(){
		return(
			<div>
				<TopBar />
				<div className="row">
					<NavigationComponent />
				</div>
			</div>
		)
	}
}