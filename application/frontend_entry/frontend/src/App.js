import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Errorpage} from './components/errorpage'
import {Homepage} from './components/homepage'
import {FolderPage} from './components/folder_page'
import {GetAssets} from './components/asset'


class App extends Component {

render() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/folders/:id?/" exact component = {FolderPage} /> 
          <Route path="/users/" exact component={Homepage} />
          <Route path="/assets/" exact component={GetAssets} />
          <Route component={Errorpage} /> 
        </Switch>          
      </div>
    </BrowserRouter>  

        );
   }
}

export default App;

