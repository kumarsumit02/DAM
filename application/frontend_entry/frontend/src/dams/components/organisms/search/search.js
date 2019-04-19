import React, { Component } from 'react';
import "/application/frontend/src/dams/css/topbar.css";

let filters = null

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
      );
  }

export class SearchComponent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      folders: [],
      assets: [],
      assetObj: [],
      value: '',
      prop: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.filterProps !== this.state.prop && nextProps.filterProps.length !== 0){
      if(nextProps.filterProps && this.state.value){
        filters = nextProps.filterProps
        this.setState({prop: nextProps.filterProps})
        this.hitDB(this.state.value,nextProps)
      }
    }
  }

  hitDB = async (value,nextProps) => {
    let searchKeyword = value
    let inputLength = value.length;
    let responseValues = {};
    let storeURL = `http://localhost:8000/search/?text=${searchKeyword}`;
    // add filters
    try{
      if(nextProps.filterProps[0].file_type.length != 0){
        for(var i=0;i<nextProps.filterProps[0].file_type.length; i++){
          storeURL = storeURL + "&file_type=" + nextProps.filterProps[0].file_type[i]
        }
      }
      if(nextProps.filterProps[0].file_status.length != 0){
        for(var i=0;i<nextProps.filterProps[0].file_status.length; i++){
          storeURL = storeURL + "&status=" + nextProps.filterProps[0].file_status[i]
        }
      }
    }
    catch{

    }
    // console .log("newProps",filters)
    // inputLength === 0 ? this.setState({results:[],folders:[],assets:[]}) :     
    let api = await fetch(storeURL);
    let results = await api.json();
    responseValues.suggestions = [...results.folder, ...results.asset];
    responseValues.folders = results.folder;
    responseValues.assets = results.asset;

    let finalResults = {};
    if (responseValues.assets.length === 0 && responseValues.folders.length === 0) {
      // this.setState({suggestions:[]});
      finalResults = {} ;
    }

    else if(responseValues.assets.length === 0 && responseValues.folders.length != 0){
      // write code for folders
      let results = {}
      let storeURL = `http://localhost:8000/folders/?id=${responseValues.folders[0]._id}`;
      if (responseValues.folders.length > 1) {
      let i
      for(i = 1; i < responseValues.folders.length; i++){
          storeURL = storeURL+"&"+`id=${responseValues.folders[i]._id}`
        }
      }
      let api = await fetch(storeURL);
      let res = await api.json();
      results.folders = res
      finalResults = results;
    }

    else if(responseValues.assets.length != 0 && responseValues.folders.length === 0){
      let results = {}
      let storeURL = `http://localhost:8000/asset_management/asset/?id=${responseValues.assets[0]._id}`;
      if (responseValues.assets.length > 1) {
      let i
      for(i = 1; i < responseValues.assets.length; i++){
          storeURL = storeURL+"&"+`id=${responseValues.assets[i]._id}`
        }
      }
      let api = await fetch(storeURL);
      let res = await api.json();
      results.assets = res
      finalResults = results;
    }

    else {
      let results = {}
      let storeURL = `http://localhost:8000/asset_management/asset/?id=${responseValues.assets[0]._id}`;
      if (responseValues.assets.length > 1) {
        let i
        for(i = 1; i < responseValues.assets.length; i++){
            storeURL = storeURL+"&"+`id=${responseValues.assets[i]._id}`
          }
        }
      let api = await fetch(storeURL);
      let res = await api.json();
      results.assets = res
      storeURL = `http://localhost:8000/folders/?id=${responseValues.folders[0]._id}`;
      if (responseValues.folders.length > 1) {
      let i
      for(i = 1; i < responseValues.folders.length; i++){
          storeURL = storeURL+"&"+`id=${responseValues.folders[i]._id}`
        }
      }
      let api2 = await fetch(storeURL);
      let res2 = await api2.json();
      results.folders = res2
      // console.log(results);
      finalResults = results;
    }

    this.props.renderResults(finalResults);

  }

  inputChange = (value) => {
    this.setState({ value: value.currentTarget.value });
    let searchKeyword = value.currentTarget.value;
    this.hitDB(searchKeyword)
  }

  render(){
    return(
      <div>
        <input type="text"
          onChange={(e) => this.inputChange(e)} 
          placeholder="Search here..." 
          className= "search"
          value={this.state.value}
          >
        </input>
      </div>
      
    )
  }
}