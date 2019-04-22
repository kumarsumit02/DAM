import React, { Component } from 'react';
import "/application/frontend/src/dams/css/filterFunc.css";


export class FilterFunc extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showMenu: false , 
      tags:[
        {id:1,
         tags:"Tag 1"},
        {id:2,
         tags:"Tag 2"}
        ], 
      file_type: [],
      file_status: [],
      imageState: 0,
      videoState: 0,
      audioState: 0,
      docState: 0,
      htmlState: 0,
      activeState: 0,
      inactiveState: 0,
      pendingState: 0,
    };
    this.clickMenu = this.clickMenu.bind(this);
    this.handleChildClick = this.handleChildClick.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  sendQuery = (event) => {
    let tar_id = event.target.id
    let filter = []
    let file_type = this.state.file_type
    let file_status = this.state.file_status
    switch(tar_id){
      case 'Image':
          if(this.state.imageState == 1){
            file_type = file_type.filter(e => e !== 'image/jpeg');
            this.setState({imageState:0})
          }
          else if(this.state.imageState == 0){
            file_type.push('image/jpeg')
            this.setState({imageState:1})
          }
        break;
      case 'Video':
          if(this.state.videoState == 1){
            file_type = file_type.filter(e => e !== 'application/mp4');
            this.setState({videoState:0})
          }
          else if(this.state.videoState == 0){
            file_type.push('application/mp4')
            this.setState({videoState:1})
          }
        break;
      case 'Audio':
          if(this.state.audioState == 1){
            file_type = file_type.filter(e => e !== 'application/mp3');
            this.setState({audioState:0})
          }
          else if(this.state.audioState == 0){
            file_type.push('application/mp3')
            this.setState({audioState:1})
          }
        break;
      case 'Document':
          if(this.state.docState == 1){
            file_type = file_type.filter(e => e !== 'application/pdf');
            this.setState({docState:0})
          }
          else if(this.state.docState == 0){
            file_type.push('application/pdf')
            this.setState({docState:1})
          }
        break;
      case 'HTML':
          if(this.state.htmlState == 1){
            file_type = file_type.filter(e => e !== 'text/html');
            this.setState({htmlState:0})
          }
          else if(this.state.htmlState == 0){
            file_type.push('text/html')
            this.setState({htmlState:1})
          }
        break;
      case 'Active':
          if(this.state.activeState == 1){
            file_status = file_status.filter(e => e !== 'active');
            this.setState({activeState:0})
          }
          else if(this.state.activeState == 0){
            file_status.push('active')
            this.setState({activeState:1})
          }
        break;
      case 'Inactive':
          if(this.state.inactiveState == 1){
            file_status = file_status.filter(e => e !== 'inactive');
            this.setState({inactiveState:0})
          }
          else if(this.state.inactiveState == 0){
            file_status.push('inactive')
            this.setState({inactiveState:1})
          }
        break;
      case 'Pending':
          if(this.state.pendingState == 1){
            file_status = file_status.filter(e => e !== 'pending');
            this.setState({pendingState:0})
          }
          else if(this.state.pendingState == 0){
            file_status.push('pending')
            this.setState({pendingState:1})
          }
        break;
    }

    this.setState({file_type:file_type,file_status:file_status})
    filter['file_type'] = file_type
    filter['file_status'] = file_status
    this.props.dataToSearch(filter)
  }

  clickMenu = (idx) => () => {
    if (idx === this.state.openSlot) {
      this.setState({
        openSlot: -1,
      });
    } else {
      this.setState({
        openSlot: idx,
      });
    }
 }
 handleChildClick=(e) => {
  e.stopPropagation()
 }

showMenu =(e) => {
  e.preventDefault();
  // e.target.icon
  this.setState({ showMenu: true }, () => {
    document.addEventListener('click', this.closeMenu);
  });
}
closeMenu(event) {
    
  if (!this.dropdownMenu.contains(event.target)) {
    
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });  
    
  }
}


  render() {
    let status=[{id:1,status:"Active"},{id:2,status:"Inactive"},{id:3,status:"Pending"}];

    let type=[{id:1,type:"Image"},{id:2,type:"Video"},{id:3,type:"Audio"},{id:4,type:"Document"},{id:5,type:"HTML"}];

    return (
      <div>
            <div onClick={this.showMenu}>
            <div className="col-md-3">
              <i className="fas fa-filter fa-2x icon"></i>
            </div>
               <div className="col-md-9 filter-text">Filter</div>
            </div>
          {
            this.state.showMenu ? 
          (
              <ul className="menu"
              ref={(element) => {
                this.dropdownMenu = element;
              }}>
                  <li
                    onClick={this.clickMenu(1)}
                    style={{ width: '100%', display: 'inline-block', backgroundColor: '#f8f9fb', height: (this.state.openSlot === 1 ? 'auto' : '20px'), overflow: 'hidden', textAlign:'center',marginTop: '20px' }}>
                    By Status
                  <ul > 
                    {
                        status.map((ele)=>(
                        <li className="level2" onClick={this.handleChildClick}>
                        <div className="row"><div className="col-md-5"><input id={ele.status} onChange={(event) => this.sendQuery(event)} type="checkbox"/></div>
                        <div className="col-md-6"><a className="small a-filter">
                        <div>{ele.status}</div></a></div></div></li>
                       ))}
                  </ul>
                  </li>
                  <li
                    onClick={this.clickMenu(2)}
                    style={{ width: '100%', display: 'inline-block', backgroundColor: '#f8f9fb', height: (this.state.openSlot === 2 ? 'auto' : '20px'), overflow: 'hidden',textAlign:'center' }}>
                    By Type
                    <ul>
                    {
                        type.map((ele)=>(
                        <li className="level2" onClick={this.handleChildClick}>
                        <div className="row"><div className="col-md-5"><input id={ele.type} onChange={(event) => this.sendQuery(event)} type="checkbox"/></div>
                        <div className="col-md-6"><a className="small a-filter">
                        <div>{ele.type}</div></a></div></div></li>
                       ))}    
                    </ul>
                  </li>
                  <li
                    onClick={this.clickMenu(3)}
                    style={{ width: '100%', display: 'inline-block', backgroundColor: '#f8f9fb', height: (this.state.openSlot === 3 ? 'auto' : '20px'), overflow: 'hidden',textAlign:'center' }}>
                    By Tags
                    <ul>
                    {
                        this.state.tags.map((ele)=>(
                        <li className="level2" onClick={this.handleChildClick}>
                        <div className="row"><div className="col-md-5"><input type="checkbox"/></div>
                        <div className="col-md-6"><a className="small a-filter">
                        <div>{ele.tags}</div></a></div></div></li>
                       ))}
                    </ul>
                  </li>
              </ul>
           )
            :(null) 
          }
    </div>
    );
  }
}