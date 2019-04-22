import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import 'react-circular-progressbar/dist/styles.css';
import '/application/frontend/src/dams/css/addAsset.css';
import CircularProgressbar from 'react-circular-progressbar';
import {Redirect} from 'react-router'
import upload from "/application/frontend/src/dams/images/upload.png";
import generalimage from "/application/frontend/src/dams/images/generaldoc.png";
import {urls} from '/application/frontend/src/dams/routes/apiRoutes'


export class AddAsset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: [],
      asset_after_uploaded: null,
      folder_name: "",
      folder_id:props.match.params.id,
      result:[],
      fileurl: null,
      uploading: false,
      progress_percent: 0,
      progres_bar_display: true,
      succuss: null,
      upload_failed: null,
      item: 1,
      total_files: null,
      redirect: false,
      files_uploaded:0,
    };
    this.url=urls
  }

  componentDidMount(){
    
    //let storeURL = (`http://localhost:8000/folders/?id=${this.props.match.params.id}`)
    let storeURL = this.url.get_folder + this.props.match.params.id
    fetch(storeURL).then(response => response.json()).then(response => {
    this.setState(
      {
        folder_name:response[0].name
      })
    }); 
   }
    

  clickedUploadButton =   (event) => {
    this.setState({
      progress_percent: 0,
      succuss: null,
      upload_failed: null,
      item: 1,
      progres_bar_display: true,
      files_uploaded:0,
      
    })
    let file = this.state.file;
    let progress = 100 /file.length;
    //console.log("File" , this.state.file.length);
    
    file.map((singlefile,index) => {
      let formData = new FormData();
      formData.append("file", singlefile)
      //console.log("add",this.state.folder_id);
      formData.append("folder_id", this.state.folder_id)
       fetch(this.url.edit_asset , {
        method: 'POST',
        body: formData
      }).then( (response) => { 
      
        return response.json();
    }).then((json_response) => {
          
            if(json_response[0].id) {
               delete this.state.file[index]
               this.setState({ 
                progress_percent: (this.state.item) * progress, 
                total_files: this.state.item, 
                item: this.state.item+1,
                files_uploaded: this.state.files_uploaded+1,
              });
              if(this.state.total_files === this.state.file.length) {
                if(this.state.file.length == 1) {

                  this.setState({ 
                    asset_after_uploaded: json_response.asset_id ,
                });
                
                }
                this.setState({ 
                  succuss: true,
              });
              }
            }
            else {
              this.setState({ 
                upload_failed: true,
                });
           
            }
           
        });
    });
  
  

  }
  clickedCancel = (event) => {
    this.setState({
      uploading: false,
    })
  }

  handleDrop = (files) => {
    this.setState({
      file: files,
      uploading: true,
      progress_percent: 0,
    })
  }

 

  checkForRedirect = () => {
   
    window.location.replace(`http://localhost:3000/folders/${this.state.folder_id}`);
   
  }

  render() {
    const uploading = this.state.uploading;
    let upload_and_cancel_button,draganddrop;

    if (uploading) {
      let file = this.state.file;
      
      draganddrop = []
      file.map((singlefile,index) => {
        console.log("File is "+singlefile.type)
        draganddrop [index] = (singlefile.type === "image/jpeg" || singlefile.type === "image/png") ? 
              <img key={index.toString()} src={URL.createObjectURL(singlefile)} className="img-thumbnail" height="100px" width="200px" alt={singlefile.path}/>  
              : <img src={generalimage} className="img-thumbnail" height="100px" width="200px" alt={singlefile.path}/> 
            
      }); 

      upload_and_cancel_button =
      <div > 
          <button data-toggle="modal" data-target="#uploadingModal" id="upload-button" type="button" className="btn-primary" btn-lg="true" onClick={this.clickedUploadButton}>Upload</button>
         
          <button type="button" className="btn-primary" btn-lg="true" onClick={this.clickedCancel}>Cancel</button>
       </div> ;

    } else {
      
      draganddrop = <br></br>
      upload_and_cancel_button = <br></br>
    }


    return (
      

          <div class = "row container-fluid">

            
            <div id="rcorners3">
            
            <div id="upload-btn">  
            <div>
              Uploading Folder : <p className="uploading-folder">{this.state.folder_name}</p>
            </div>
            <Dropzone onDrop={this.handleDrop} >     
              
                  {({getRootProps, getInputProps}) => (
               <section>
                   <div {...getRootProps()}>
                   <img src={upload} width="100px" height="100px" className="img-responsive upload-icon" alt="Responsive image"></img>
                     <input {...getInputProps()} />
                        <p style={{ marginTop: '20px' }}>Drag and drop some files here, or click to select files</p>
                    </div>

                    <div id="Progressbar">
                    {this.state.progres_bar_display ? (
                           
                       <div className="modal" id="uploadingModal" role="dialog">
                          <div className="modal-dialog">
                              <div className="modal-content">
                                  <div className="modal-body">   
                                  <CircularProgressbar
                                        className="inverted"
                                        background
                                        percentage={this.state.progress_percent}
                                        text={`${this.state.progress_percent}%`}
                                                    /> 
                                    <div>
                                       <h3> Total files uploaded : {this.state.files_uploaded} </h3>
                                    </div>
                                    <div>
                                      {
                                        this.state.succuss ? <h2> File Uploaded Successfully !</h2>
                                        :  this.state.upload_failed ? <h2> Error!</h2> : null
                                       }
                                        
                                    </div>

                                      <button  className="btn-dam" data-dismiss="modal" onClick={this.checkForRedirect}>Ok</button>
                                  
                                    </div>
                                  </div>
                          </div>
                      </div>  
                          
                        )
                        :
                        <div></div> }
                    </div>
                </section>

  
                )}

              </Dropzone>
                 
              </div>
              <div id="image-preview"> {draganddrop} </div>
              
              {upload_and_cancel_button}
              
            </div>
            </div>
      
    );
  }
}