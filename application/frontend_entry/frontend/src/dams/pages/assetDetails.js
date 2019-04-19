import React, { Component } from 'react';
import {TopBar} from "/application/frontend/src/dams/components/organisms/assetTopbar.js";
import {AssetLeftSideBar} from "/application/frontend/src/dams/components/organisms/assetLeftsidebar"
import {AssetRightSideBar} from "/application/frontend/src/dams/components/organisms/assetRightsidebar"
import EditAssetBar from "/application/frontend/src/dams/components/organisms/editAsset"

export class AssetDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      toggle_edit:true
    }
  }

  togglefunc(){
    
    this.setState(
    {
      toggle_edit:!this.state.toggle_edit
    }
  )
  }


  render() {
    return (
       <div>
            <TopBar />
           <div class = "row container-fluid">

                  <div class="col-md-6 col-sm-6">
                      <AssetLeftSideBar icon={<i class="far fa-image fa-4x dam-icon assetpos"></i>} {...this.props} toggle={() => this.togglefunc()}  />
                  </div>
              
                  <div class = "col-md-6 col-sm-6">
                  {this.state.toggle_edit ?  <AssetRightSideBar {...this.props} /> : <EditAssetBar {...this.props}/>}
              
                  </div>
          </div>

        </div>
      )
  }
}