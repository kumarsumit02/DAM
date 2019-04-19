import React, { Component } from 'react';
import {Link} from "react-router-dom";  
import "/application/frontend/src/dams/css/sidebar.css";
import {FilterFunc} from "/application/frontend/src/dams/components/organisms/filterFunc"

export class SideBar extends Component{

render(){  
    return(
        <div className="row">
              
            <div className="row icon-group">
                <div className="col-md-3">
                    <i className="far fa-gem fa-2x"></i>  
                </div>
                <div className="col-md-9" onClick={()=> this.props.add_page()}>
                    <p className="sidebartext"> Add Asset </p>
                </div>
            </div>

            <div className="row icon-group">
                <div className="col-md-3">
                    <i className="far fa-folder fa-2x"></i> 
                </div>
                <div className="col-md-9">
                    <a href="/folders" className="sidebartext"> Folders </a>
                </div>
            </div>


            <div className="row icon-group">               
                 <FilterFunc dataToSearch={(id)=>this.props.dataToSearch(id)}/>   
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
