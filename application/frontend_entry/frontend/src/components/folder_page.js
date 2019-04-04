import React,{Component} from "react";
import "/application/frontend/src/css/folderview.css";
import {FoldersComponents} from "./folder_helper";
import {SideBar} from './sidebar';
import {TopBar} from './topbar';

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
