import React, { Component } from 'react';

export class GetAssets extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          users_data: [],
          folder_id: "2fc77115-5c4c-454e-b083-17beb7f01725",
          display : "inline-block"
        };
      }
          
    componentWillMount() {
     
      this.setState({
          user_data : this.props.user_data,
      })
      
    }

    render() {
        return (
            
              <h1> Heloowq</h1>
        );
    }
 }

export class DisplayImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          mouseOver: false,
          users_data: [],
          folder_id: "2fc77115-5c4c-454e-b083-17beb7f01725",
          display : "inline-block"
        };
      }
    
       
      componentWillMount() {
       this.setState({
            user_data : this.props.user_data,
       })
            
      }

      componentDidMount() {

    
        // $(document).ready(function() {
        //     $('#example').DataTable( {
        //         responsive: true,
        //             "pageLength": 10
        //     } );
        // } );
      }

      mouseMovedOnRow = (event) => {

        event.currentTarget.childNodes[3].childNodes[0].childNodes[1].style.display = 'inline-block';
       
      }
      mouseMovedOutOfRow = (event) => {

        event.currentTarget.childNodes[3].childNodes[0].childNodes[1].style.display = 'none';
       
      }

      render() {
          let mouseOver = this.state.mouseOver;
          return (
                <div>
                  
                 <div id="homepage-container">
                 <table id="example" className="table">
                         <thead className="Rectangle">
                             <tr>
                             <th style = {{width: '6.66%'}} scope="col">
                                 <input type="checkbox"></input>
                             </th>
                             <th style = {{width: '19.66%'}} scope="col"></th>
                             <th style = {{width: '16.66%'}} scope="col"></th>
                             <th style = {{width: '36.66%'}}  scope="col"></th>
                             <th style = {{width: '6.66%'}}  scope="col"></th>
                             </tr>
                         </thead>
                         
                         <tbody>
                    
                        { 
                            this.state.user_data.map( (item,index) => (
                           
                                <tr className= 'table-row' key={index.toString()} onMouseEnter={this.mouseMovedOnRow} onMouseLeave={this.mouseMovedOutOfRow}>
                                <th className="table-data" style = {{width: '6.66%'}} scope="row">
                                    <input className="checkbox" type="checkbox"></input>
                                </th>
                              
                                <td className="table-data" style = {{width: '19.66%'}} > <img className="thumbnail" src={`http://localhost:8000/media/${item.thumbnail}`}/></td>
                                <td className="table-data" style = {{width: '16.66%'}}><p className="name">{item.asset_name}</p> </td>
                                <td className="table-data" style = {{width: '36.66%'}}  scope="col">
                          
                                    <div className="size-operations">
                                  
                                      <div>{item.size}  </div>   

                                      <div className="asset-operation" style = {{display: 'none'}}>
                                            <DispElement/> 
                                      </div>
                                  
                                    </div>
                                  
                                </td>
                                <td className="table-data" style = {{width: '0%'}}  scope="col"></td>
                              </tr> ))} 

                    </tbody>
                      
                        
                   </table>

                   <div className="pagination">
                    <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="4">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="6">1</a></li>
                                <li class="page-item"><a class="page-link" href="7">2</a></li>
                                <li class="page-item"><a class="page-link" href="8">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                   </div>
                 </div>
         
 
                </div>  );
         
      }
}

export class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      users_data: [],
      folder_id: "2fc77115-5c4c-454e-b083-17beb7f01725",
      display : "inline-block"
    };
  }

   
  componentWillMount() {
   
    let fetch_data = "hellow" ;
    let fetchURL = "http://localhost:8000/asset_management/asset?folder_id="+this.state.folder_id
    fetch(fetchURL).then(rsp => rsp.json()).then(results => {
        console.log('Asset backend resp', results[0].thumbnail);
        this.setState({
            user_data: results,
            loaded: true,
        })
    
        // console.log("data",this.state.user_data[0].thumbnail)
    });


  }

  displayOperations = (event) => {
    // console.log("COMMING TO THIS FUNCTIONSSSS!!!!")
    // let styles = {
    //     display: {
    //         display: 'inline-block',
    //         ':hover': {
    //           display: 'none',
    //           visibility: 'hidden'
    //         }
    //     }
    // }
    this.setState({
        display: "none",
    })

  }

  getCurrentState = (event) => {
    return this.state.d;
}

  render() {
      let loaded = this.state.loaded;
      return (
            <div>            
                <div className="container">
                <div className="row">
                    <Topbar/>
                </div>
                <div className="row">
                    <div className="col-md-1">
                            <Sidenav/>
                    </div>
                    <div className="col-sm-10 col-md-11">
                        <div id="asset-content">
    
                            {
                                loaded ? (
                                <div>
                                    <DisplayImage user_data = {this.state.user_data}/>
                                </div>
                                ) : (
                                <div></div>
                                )
                            }
                            
                        </div>
                             
                        
                    </div>
                
                </div>
                </div>
                
                   
            </div>
      );
  }
}



function Sidenav(props) {
    let sidenav = <table className="table table-striped">
                        <tbody>
                        <tr>
                        <th scope="row">1</th>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        </tr>
                        <tr>
                        <th scope="row">4</th>
                        </tr>
                        <tr>
                        <th scope="row">5</th>
                        </tr>
                        <tr>
                        <th scope="row">6</th>
                        </tr>
                        <tr>
                        <th scope="row">7</th>
                        </tr>
                    </tbody>
                 </table> ;
    return sidenav;
  }

function Topbar(props) {

    let topbar =<div className="topbar">
            <img src="https://cdn.gale.agency/wp-content/uploads/2018/08/Alchemy_logo_RBG.png"  className="alchemy-logo" align="left" />
           
            <input className= "search" type="text" placeholder="    Search here  ..." />
         
            <i className="far fa-bell fa-2x s-bell bellicon"></i>

      			<i className="fas fa-user-circle fa-4x s-profile dropdown-toggle loginicon " id="menu2" data-toggle="dropdown">
      					<ul className="dropdown-menu" role="menu1">
      						      	<li><a tabIndex="-1" href="#">Manage Profile</a></li>
      						      	<li><a tabIndex="-1" href="#">Back to DAM</a></li>
      						      	<li><a tabIndex="-1" href="#">Logout</a></li>
      				    </ul>
      			</i>
    </div> ;

    return topbar;
}

function DispElement() {

    let element =  <div className="operations" style = {{display: 'inline-block' }}>
    <i className="far fa-comment fa-1.5x dam-icon" title="Comment"></i>
    <i className="far fa-trash-alt fa-1.5x dam-icon "title="Delete"></i>
    <i className="far fa-share-square fa-1.5x dam-icon " title="Share"></i>
    <i className="far fa-eye dam-icon" title="View"></i>
    </div> ;

    return element;
}

