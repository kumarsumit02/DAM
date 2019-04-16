import React,{Component} from "react";
import "/application/frontend/src/css/folderview.css";
import {FoldersComponents} from "/application/frontend/src/components/folder_helper.js";
import {SideBar} from "/application/frontend/src/components/sidebar.js";
import {TopBar} from "/application/frontend/src/components/topbar.js";


export class FolderPage extends Component {

  
render(){
  
    return(
           <div>
              <TopBar />
              
              <div className="col-md-2">
                 <SideBar />  
              </div> 

              <div className="col-md-10">
                 <FoldersComponents {...this.props}/>                 
              </div>     

            </div>    
          )
     }
}
