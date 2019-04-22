import React, { Component } from 'react';
import "/application/frontend/src/dams/css/assetRightSideBar.css";
import {urls} from '/application/frontend/src/dams/routes/apiRoutes'

export class AssetRightSideBar extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      user_data: [],
      tags:[]
    };
    this.url=urls
 }
  componentDidMount(){
    let fetchURL = this.url.get_asset + this.props.match.params.id
         fetch(fetchURL).then(rsp => rsp.json()).then(results => {
          this.setState({
                user_data: results[0],
            })        
        });
    let fetchURLTAG = "http://localhost:8000/asset_management/tags/?id="+ this.props.match.params.id
        fetch(fetchURLTAG).then(rsp => rsp.json()).then(results => {

          console.log("Result",results);
          let tagArray=[];
            results.map( (item,index) => (
                tagArray.push({'id': item.id.toString(),'text': item.tag_name})
            ))
            this.setState({
              tags: tagArray,
            })  
        
       
        });    
    }

  back(){
      window.location.replace(`http://127.0.0.1:3000/folders/${this.state.user_data.folder_id_id}`)
    }


  render() {
    return (

       <div>
            <div class="row dam-icon">
                <div class="col-md-3 col-md-offset-9">
                          <button className="buttoncolorasset" onClick={()=> this.back()}><i className="fas fa-reply fa-2x"></i></button> 
                </div>
            </div>

            <div class="row field">
                  <div class="col-md-3"><strong>Asset Name:</strong></div>
                  <div class="col-md-9"> <strong>{this.state.user_data.asset_name}</strong></div>
            </div>


           <div class="row field">
                  <div class="col-md-3">
                                  <strong>Tags:</strong>
                  </div>
                    <div class="col-md-9 ">
                      <div class="box">
                         <div class="row col-md-12">
                            <div class="col-md-4 tagtab">
                              {    
                                   this.state.tags.map( (item,index) => (
                                    <div id="tags">
                                      {item.text}
                                    </div>
                                  
                                    ))     
                            }
                            </div>
                         </div>
                      </div>      
                     </div>    
            </div>            
            
            


            <div class="row field">
                  <div class="col-md-3"><strong>Created on:</strong></div>
                  <div class="col-md-9"> <strong>{this.state.user_data.creation_date}</strong></div>
            </div>

            <div class="row field">
                  <div class="col-md-3"><strong>Status:</strong></div>
                  <div class="col-md-9"> <strong>{this.state.user_data.status}</strong></div>
            </div>
        </div>
    );
  }
}