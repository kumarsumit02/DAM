import React, { Component } from 'react';
import {Link} from "react-router-dom"; 
import "/application/frontend/src/dams/css/folderview.css";
import {urls} from '/application/frontend/src/dams/routes/apiRoutes'

export class Asset extends Component {

  constructor(props){
    super(props);
    this.state = {
      user_data: [],
      folder_id: this.props.parent,
      hover_id:"",
      checked: false,
      selected_all:false,
      asset_to_be_deleted: [],
      asset_suggestions: [],
 
    };
    this.url=urls
  }
  
  template = (data,idx) => {
    return(
       <div key={data.id}> 
          <a href={`/asset_details/${data.id}`}>
           <div className ="row rowhighlight" onMouseEnter={() =>this.showhover(data.id)} onMouseLeave={() =>this.showhoverout()} >  
             <div className="col-md-1">
               {this.state.selected_all ? 
                            <input className="checkbox" checked = {true} type="checkbox" ></input> 
                            : 
                            <input className="checkbox" id={data.id} onChange={this.clickedOnCheckBox(idx)} type="checkbox"></input>
               }
             </div>                 
              <div className="col-md-2">                                         
                  <img src={ this.url.media + data.thumbnail} height="75" width="105" align="left"/>
              </div>
        
             <div className="col-md-6 text">
                {data.asset_name}
             </div>

             {this.state.hover_id === data.id  ? 
                <span>
                    <button><i className="far fa-trash-alt fa-lg padding10" onClick={(e) => this.delete(e,data.id)}></i></button>

                </span> : <span> </span>
              }                             
               
            </div>
           </a>                          
       </div>
      )
    }
     
  showassets(){
    
       let fetchURL = this.url.get_asset_folder + this.state.folder_id
       fetch(fetchURL).then(rsp => rsp.json()).then(results => {
        this.setState({
              user_data: results,
          })       
      });
  }   

  componentDidMount() {
    this.props.onRef(this)
  }
  
  // componentWillUnmount() {
  //   this.props.onRef(undefined)
  // }

  componentWillReceiveProps(nextProps) {
     if(nextProps.selected_all !== this.state.selected_all)
     {
       this.setState({
              selected_all:nextProps.selected_all,
          }) 
     }
     if(this.state.folder_id!==nextProps.parent){
        let fetchURL = this.url.get_asset_folder + nextProps.parent
        fetch(fetchURL).then(rsp => rsp.json()).then(results => {
        this.setState({
              user_data: results,
              folder_id: nextProps.parent
          })  
        
      });
    }
    if (nextProps.asset_data != undefined) {
      this.setState({ asset_suggestions: nextProps.asset_data.assets})
      if(nextProps.asset_data.assets != undefined){
        this.setState({user_data: []})
      }
    }  
  }

  delete(e,id){
   
   e.preventDefault();

   let storeURL = this.url.delete_asset + id
   fetch(storeURL,{ method: "delete"}).then(res => this.showassets()); 

  }

    assetpage(){
      return(
       <Link to="/asset_details"> </Link>
       )
    }

    showhover=(id) =>{
         this.setState(
            {
              hover_id:id
            }
          );
    }

    showhoverout=() =>{
           
         this.setState(
            {
              hover_id:""                
            }
          );
    }

    clickedOnCheckBox = param => event => {
      
      if(event.target.checked) {
        let deleting_id = this.state.asset_to_be_deleted;
        deleting_id.push(event.target.id)
        this.setState({
          asset_to_be_deleted: deleting_id,
      })
         this.props.asset(this.state.asset_to_be_deleted)
      }
      else {
        let filteredItems = this.state.asset_to_be_deleted.filter(item => !event.target.id.includes(item))
        this.setState({
          asset_to_be_deleted: filteredItems,  
         })
          this.props.asset(filteredItems)
      }
      
    };
     

 render() {
   return (
        <div>    
        {
          this.state.asset_suggestions ?
          this.state.asset_suggestions.map((data, idx) => {
            return this.template(data,idx)
          })
          :
          this.state.user_data.map((data,idx)=> {
            return this.template(data,idx) 
          })
        }
        </div>
      );
  }
}
