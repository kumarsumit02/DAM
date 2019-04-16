import React, { Component } from 'react';
import "/application/frontend/src/css/assetLeftSideBar.css";
import {PreviewSideBar} from "/application/frontend/src/components/preview_sidebar"
import {AssetUtility} from '/application/frontend/src/components/asset_utility';

export class AssetLeftSideBar extends Component {
  render() {
    const customStyle = this.props.customStyle || {};
    // console.log('Custome Style', customStyle);
    return (
       <div className="container">
            <div className="row">
              <div className ="col-md-1">
                    <PreviewSideBar />
              </div>

              <div className ="col-md-11">
                    <div className="row">
                        <div className="col-md-12">                            
                            <AssetUtility {...this.props}/>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12">
                             
                            {/* <div class="container-fluid">
                            <h2>Comment will come here</h2>
                            </div> */}

                        </div>

                    </div>
              </div>
                </div>
        </div>
      
    );
  }
}

