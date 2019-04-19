import React, {Component} from 'react'
import {ProfileIcon, Logo, ModuleTitle} from '../atoms/button/'
import './style.css'

export class TopBar extends Component{
	render(){
		return(

			<header>
				<div className="Rectangle">
					<div className="topbar-container">
						<div className="row">
							<div className="col-md-5">
								<div className="row">
									<div className="col-md-4">
										<Logo />
									</div>
									<div className="col-md-8">
										<ModuleTitle />
									</div>
								</div>
							</div>
							<div className="col-md-2 col-md-offset-5">
								<ProfileIcon />
							</div>
						</div>
					</div>	
				</div>
			</header>
			)
		}	
}