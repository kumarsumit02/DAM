import React, { Component } from 'react';
import {TopBar} from './topbar'
import {SideBar} from './sidebar'


export class Homepage extends Component{

	render(){
		return(
			<div>
              <TopBar />
              <div className="col-md-2">
                 <SideBar />  
              </div>         
            </div>           
			  )
		
	        }

}