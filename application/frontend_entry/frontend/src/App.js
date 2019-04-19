import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Errorpage} from "/application/frontend/src/dams/pages/errorpage.js"
import {Homepage} from "/application/frontend/src/dams/pages/homepage.js"
import {FolderPage} from "/application/frontend/src/dams/pages/folderpage.js"
import {AssetDetails} from "/application/frontend/src/dams/pages/assetDetails.js"

class App extends Component{

render(){
  return(
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/folders/:id?/" exact component = {FolderPage} /> 
          <Route path="/users/" exact component={Homepage} />
          <Route path="/asset_details/:id?" exact component={AssetDetails} />
          <Route component={Errorpage} /> 
        </Switch>          
      </div>
    </BrowserRouter>  

        );
   }
}

export default App;

