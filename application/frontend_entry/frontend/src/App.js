import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Errorpage} from "/application/frontend/src/dams/pages/errorpage.js"
import {Homepage} from "/application/frontend/src/dams/pages/homepage.js"
import {FolderPage} from "/application/frontend/src/dams/pages/folderpage.js"
import {AssetDetails} from "/application/frontend/src/dams/pages/assetDetails.js"
import {ManagementConsole} from '/application/frontend/src/management_app/pages/management_console'
import {FolderRoutes} from "/application/frontend/src/dams/pages/routes.js"


class App extends Component{

render(){
  return(
    <div>
       <FolderRoutes />
    </div>

        );
   }
}

export default App;

