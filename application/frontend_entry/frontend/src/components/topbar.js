import React, { Component } from 'react';
import alchemylogo from "/application/frontend/src/alchemylogo.png";
import "/application/frontend/src/css/topbar.css";
import {Link} from "react-router-dom";  

export class TopBar extends Component{

render(){
   
    return(
      <div className="row topbar">
        <div className="col-md-4 alchemy-logo">
           <Link to="/"><img src={alchemylogo} className="alchemy-logo" align="left"/></Link>
        </div>  

        <div className="col-md-6 col-md-offset-2">
          <input className= "search" type="text" placeholder="    Search here  ..." />
        </div>   
           
        <div className="col-md-2 loginicon">
          <i className="fas fa-user-circle fa-4x s-profile dropdown-toggle " id="menu2" data-toggle="dropdown">
            <ul className="dropdown-menu" role="menu1">
              	<li><a tabIndex="-1" href="#">Manage Profile</a></li>
              	<li><a tabIndex="-1" href="#">Back to DAM</a></li>
              	<li><a tabIndex="-1" href="#">Logout</a></li>
            </ul>
          </i>
        </div> 
        
      </div>
      
    	  )
   }
}