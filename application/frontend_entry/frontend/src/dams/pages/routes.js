import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Errorpage} from "/application/frontend/src/dams/pages/errorpage.js"
import {Homepage} from "/application/frontend/src/dams/pages/homepage.js"
import {FolderPage} from "/application/frontend/src/dams/pages/folderpage.js"
import {AssetDetails} from "/application/frontend/src/dams/pages/assetDetails.js"


export class FolderRoutes extends Component{

render(){
  return(
  	<div>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/folders/:id?/" exact component = {FolderPage} /> 
          <Route path="/asset_details/:id?" exact component={AssetDetails} />
        </Switch>          
      </div>
    </BrowserRouter> 
    </div> 

        );
   }
}