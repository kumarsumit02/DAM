import React, { Component } from 'react';
import "/application/frontend/src/css/assetRightSideBar.css";

export class AssetRightSideBar extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      user_data: [],
    };
 }
  componentDidMount(){
    let fetchURL = "http://localhost:8000/asset_management/asset/?id="+ this.props.match.params.id
         fetch(fetchURL).then(rsp => rsp.json()).then(results => {
          this.setState({
                user_data: results[0],
            })       
        });
  }
  back(){
      window.location.replace(`http://127.0.0.1:3000/folders/${this.state.user_data.folder_id}`)
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
                                  <div id="tags">tags
                                  </div>
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