import React, { Component } from 'react';
import "/application/frontend/src/dams/css/assetUtility.css";
import "/application/frontend/src/dams/css/deleteModal.css";

export class AssetUtility extends Component {

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
  
  delete(id){

    let storeURL = ('http://localhost:8000/asset_management/asset/?id='+ id)

    fetch(storeURL,{ method: "delete"}).then(res => this.showassets());      

       window.location.replace(`http://127.0.0.1:3000/folders/${this.state.user_data.folder_id_id}`)             
    }

    back(){
      window.location.replace(`http://127.0.0.1:3000/folders/${this.state.user_data.folder_id_id}`)
    }

   copyToClipboard(e){
    
    document.getElementById("myTextArea").select();
    document.execCommand('copy');
    
  };

        

  render() {
    var extension = String(this.state.user_data.asset_path)
    var type = extension.split('.')
    // console.log("path",type[1]);

    return (
             <div>
                    <div className="asset_box">
                    
                        {type[1] == ('jpg'||'jpeg'||'png'||'Exif'||"JPEG/JFIF") ? 
                             <img src={`http://localhost:8000/media/${this.state.user_data.asset_path}`} className="asset_box_image" align="left" data-toggle="modal" data-target="#imagemodal"  /> 
                                : 
                             <img src={`http://localhost:8000/media/${this.state.user_data.thumbnail}`} className="asset_box_image" align="left" data-toggle="modal" data-target="#imagemodal" /> }
                          <div class="modal" id="imagemodal"> 
                              {type[1] == ('jpg'||'jpeg'||'png'||'Exif'||"JPEG/JFIF") ? <object  className="image-center" data={`http://localhost:8000/media/${this.state.user_data.asset_path}`} /> : <video className="image-center" src={`http://localhost:8000/media/${this.state.user_data.asset_path}`} controls />}
                           </div>
                    </div>

                    <div className="edit">
                      <i className="far fa-edit fa-2x dam-icon"  title="Edit" onClick= {() => this.props.toggle()}></i>
                      
                      <i className="far fa-trash-alt fa-2x dam-icon" data-toggle="modal" data-target="#myModal" title="Delete"></i>
                            <div class="modal fade" id="myModal">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <div class="modal-body">
                                          <p class="modalText">Are you sure you want to delete the asset?</p>
                    
                                          <button type="button" class="btn-dam" data-dismiss="modal">Cancel</button>
                                          <button type="button" class="btn-dam" onClick={()=> this.delete(this.state.user_data.id)}>Delete</button>
                                        </div>
                                      </div>
                              </div>
                            </div>
                      <i className="far fa-share-square fa-2x dam-icon " title="Share" data-toggle="modal" data-target="#sharemodal"></i>
                         <div class="modal" id="sharemodal" >
                              <div class="modal-share-dialog">
                                  <div class="modal-share">
                                      <div class="modal-share-body">
                                        <input type="text" className="input-box" value ={window.location} id="myTextArea"/>&nbsp;&nbsp;
                                        <button onClick={(e)=> this.copyToClipboard(e)}> <i class="fa fa-2x fa-clipboard clipboard" aria-hidden="true"></i> </button>
                                      </div>
                                  </div>
                              </div>
                         </div>
                       
                     
                  </div>
            </div>
      
    );
  }
}

