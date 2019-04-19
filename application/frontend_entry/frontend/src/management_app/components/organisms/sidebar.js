import React, {Component} from 'react'
import {
  BrowserRouter as Router, Route
} from 'react-router-dom'
import {NavigationBlock} from '../molecules/navigation_block'
import {routes} from '../_settings/routes.js'


export const RouteComp = () => (
  <div className="col-sm-9">
        <div className="target-content">
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        </div>
  </div>
)


export class Sidebar extends Component{
  render(){
    return(
      <Router>
        <div className="col-sm-3" >
          <NavigationBlock />
        </div>
        <RouteComp />
      </Router>
      )
  }
}

