import React, { Component } from 'react';
import {SideBar} from "/application/frontend/src/components/sidebar.js";
import {TopBar} from "/application/frontend/src/components/topbar.js";


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