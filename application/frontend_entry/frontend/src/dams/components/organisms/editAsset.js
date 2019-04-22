import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter , Redirect} from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';
import "/application/frontend/src/dams/css/editAssetbar.css";
import "/application/frontend/src/dams/css/inputtag.css";
import {urls} from '/application/frontend/src/dams/routes/apiRoutes'


class EditAssetBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
     id: this.props.match.params.id,
     redirect: false,
     name: 'Name',
     tags: [
      
   ],
  suggestions: [
  
   ],
     activate_on: null,
     expire_on: null,
     suggestions: [

        ]
    };
    this.url=urls
  }

  componentWillMount() {
    if(this.props.match.params) {
      let fetchURL = this.url.get_asset +this.props.match.params.id
      fetch(fetchURL).then(rsp => rsp.json()).then(results => {
        
          this.setState({
              activate_on: results[0].activate_on,
              expire_on: results[0].expire_on,
              name: results[0].asset_name,
              loaded: true,
          })  
      
      });

      let fetchURLTAG = this.url.get_tags +this.props.match.params.id
      fetch(fetchURLTAG).then(rsp => rsp.json()).then(results => {
        let tagArray=[];
          results.map( (item,index) => (
              tagArray.push({'id': item.id.toString(),'text': item.tag_name})
          ))
          this.setState({
            tags: tagArray,
          })  
      
     
      });
    }

  }

  onChangeValues = (event) => {
     let name = event.target.name;
     let value=event.target.value;
     let upload = true;
     if(name === 'expire_on') {
      if (this.state.activate_on > value) {
        alert("Invalid Date")
        upload = false;
     }
    }
    if(name === 'activate_on') {
      if (value > this.state.expire_on) {
        alert("Expires On Should Not Grater Than Activate On")
        upload = false;
     }
    }
     if(upload) {
      this.setState({
        [name] : value,
      })
    }

}

  editAsset = (event) => {

   
    let formData = new FormData();
    formData.append('id', this.state.id );
    formData.append('activate_on', this.state.activate_on );
    formData.append('expire_on', this.state.expire_on );
    formData.append('name', this.state.name );

    fetch(this.url.edit_asset, {
        method: 'PUT',
        body: formData
      }).then( (response) => { 
          return response.json();
      }).then((json_response) => {

        this.setState({
          redirect: true,
        })
      
    });
  }

  handleDelete = (position) => {
    let requestOptions = {
      method: 'DELETE'
    };
   
    const { tags } = this.state;

    let params = "tag="+this.state.tags[position].text;
   
    let fetchURL = this.url.fetch_tags + params
    fetch(fetchURL,requestOptions).then(rsp => rsp.json()).then(results => {
        
     
    });

    this.setState({
      tags: tags.filter((tag, index) => index !== position),
     });

  }

  handleAddition = (tag) =>  {

    let formData = new FormData();
    formData.append('id', this.state.id );
    formData.append('tag', tag["text"] );

    fetch(this.url.post_tags, {
      method: 'POST',
      body: formData
    }).then( (response) => { 
        return response.json();
    }).then((json_response) => {
      
  });
   
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  redirect = () => {
    window.location.replace(`http://localhost:3000/asset_details/${this.state.id}`);
  }

  render() {

    const KeyCodes = {
      comma: 188,
      enter: 13,
    };
     
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const { tags, suggestions } = this.state;

    if(this.state.redirect) {
        this.redirect()
      }

    return (
      <div>

        <div class="row field">
                <div class="col-md-3 Title-"><strong>Title</strong></div>
                <div class="col-md-9">
                  <div id="tags"></div>
                  <input type="text" name="name" placeholder="TITLE"   onChange={this.onChangeValues} class="box1" value={this.state.name}/>
                </div>
        </div>

        <div class="row field">
                <div class="col-md-2"><strong>Tags</strong></div>
                <div class="col-md-9">
                  <div className=" col-md-10">
                    <ReactTags tags={tags}
                      allowUnique = {true}
                      inputFieldPosition="bottom"
                      suggestions={suggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      delimiters={delimiters}/>
                    </div>
                
                 
                
                </div>
        </div>
        <div class="row field">
                <div class="col-md-3"><strong>Activates On</strong></div>
                <div class="col-md-9">
                  <input type="date" name="activate_on" placeholder="ACTIVES_ON ( YY - MM - DD)" onChange={this.onChangeValues} class="box1" value={this.state.activate_on}/>
                </div>
        </div>

        <div class="row field">
                <div class="col-md-3"><strong>Expires On</strong></div>
                <div class="col-md-9">
                
                <input type="date" name="expire_on"  placeholder="EXPIRESS_ON ( YY - MM - DD)" onChange={this.onChangeValues} class="box1" value={this.state.expire_on}/>
                </div>
        </div>

      <div>
        <button class="btn btn-secondary btn-lg active SaveButton" onClick={this.editAsset} aria-pressed="true"><div class="Save">Save</div></button>
      </div>
        </div>
    );
  }
}

export default EditAssetBar;

 

