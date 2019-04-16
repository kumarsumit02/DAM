import React, { Component } from 'react';
import {TopBar} from "/application/frontend/src/components/topbar.js";
import {AssetLeftSideBar} from "/application/frontend/src/components/asset_leftsidebar"
import {AssetRightSideBar} from "/application/frontend/src/components/asset_rightsidebar"

export class AssetDetails extends Component {

  render() {
    return (
       <div>
          <TopBar />
           <div class = "row container-fluid">

                  <div class=" col-md-6">
                      <AssetLeftSideBar icon={<i class="far fa-image fa-4x dam-icon assetpos"></i>} {...this.props}/>
                  </div>
              
                  <div class = "col-md-6">
                      <AssetRightSideBar {...this.props} />
                  </div>
          </div>

        </div>
      )
  }
}