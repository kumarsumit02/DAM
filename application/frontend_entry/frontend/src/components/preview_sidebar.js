import React, { Component } from 'react';
import "/application/frontend/src/css/previewSideBar.css"

export class PreviewSideBar extends Component {
  render() {
    const customStyle = this.props.customStyle || {};

    return (
       <div>
           <i className="far fa-gem fa-2x dam-icon ver " style={customStyle['asset']} title="Asset Icon"></i>
            <a href="/folders"> <i className="far fa-folder fa-2x dam-icon ver" style={customStyle['managefolder']} title="Manage Folder"></i></a>
            <i className="fas fa-cog fa-2x setting" style={customStyle['setting']} title="Setting"></i>
        </div>
      
    );
  }
}

