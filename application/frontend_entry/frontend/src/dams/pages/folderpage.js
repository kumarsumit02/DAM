import React,{Component} from "react";
import "/application/frontend/src/dams/css/folderview.css";
import {FoldersComponents} from "/application/frontend/src/dams/components/organisms/folderHelper.js";
import {SideBar} from "/application/frontend/src/dams/components/organisms/sidebar.js";
import {TopBar} from "/application/frontend/src/dams/components/organisms/topbar.js";
import {AddAsset} from "/application/frontend/src/dams/components/organisms/addAsset.js"


export class FolderPage extends Component {
   constructor(props){
    super(props);
    this.state={
      toggle_add:true,
      results: [],
      filters: []
    }
  }

  togglefunc(){
    
    this.setState(
    {
      toggle_add:!this.state.toggle_add
    }
  )
  }

  changeData = (value) => {
    // console.log(value, "LAST VALUE");
    this.setState({results:value});
  }

  dataToSearch = (value) => {
    this.setState({filters: [value]});
  }

  
render(){
  
    return(
           <div>
             <TopBar filterProps={this.state.filters} toSetState={(newData) => this.changeData(newData)} />
              
              <div className="col-md-2">
                 <SideBar dataToSearch={(newData) => this.dataToSearch(newData)} add_page={()=>this.togglefunc()}/> 
              </div> 

              <div className="col-md-10">
                 {this.state.toggle_add ?  <FoldersComponents {...this.props} data={this.state.results}/> : <AddAsset {...this.props} />}                   
              </div>     

            </div>    
          )
     }
}
