import React, { Component } from 'react';
import {Link} from "react-router-dom";  
import "/application/frontend/src/css/sidebar.css";

export class SideBar extends Component{

render(){  
    return(
        <div className="row">
              
            <div className="row icon-group">
                <div className="col-md-3">
                    <i className="far fa-gem fa-2x"></i>  
                </div>
                <div className="col-md-9">
                    <Link to="/Add Asset" className="sidebartext"> Add Asset </Link>
                </div>
            </div>

            <div className="row icon-group">
                <div className="col-md-3">
                    <i className="far fa-folder fa-2x"></i> 
                </div>
                <div className="col-md-9">
                    <Link to="/folders" className="sidebartext"> Folders </Link>
                </div>
            </div>


            <div className="row icon-group">
                <div className="col-md-3">
                    <i className="fas fa-filter fa-2x"></i> 
                </div>
                <div className="col-md-9">
                    <Link to="/Filter" className="sidebartext"> Filter</Link>
                </div>
            </div>


            <div className="row icon-group">
                <div className="col-md-3">
                    <i className="fas fa-cog fa-2x"></i>  
                </div>
                <div className="col-md-9">
                    <Link to="/Settings" className="sidebartext"> Settings</Link>
                </div>
            </div>
              
                
        </div>
      
    	  )
 
   }
}
