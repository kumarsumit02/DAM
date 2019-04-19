import React, { Component } from 'react';
import "/application/frontend/src/dams/css/assetLeftSideBar.css";
import {AssetUtility} from '/application/frontend/src/dams/components/atoms/assetUtility';

export class AssetLeftSideBar extends Component {
  render() {
    
    return (
     
       
            <div className="row">

              
                    <div className="row">                                                   
                       <AssetUtility {...this.props}/>                      
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                             
                            {/* <div class="container-fluid">
                            <h2>Comment will come here</h2>
                            </div> */}

                        </div>

                    </div>
               
             </div>
        
       
      
    );
  }
}

