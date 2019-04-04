import React,{Component} from "react";
import foldericon from "/application/frontend/src/foldericon.png";
import "/application/frontend/src/css/folderview.css";

export class FoldersComponents extends Component {

  constructor(props){
    super(props);

    this.state={
      id: "",
      result: [],
      parent: "",
      hover_id: "",
      test: props.match.params.id
    } 
  }

  componentDidMount(){
    if (this.state.test == null) {
     this.showfolders();
    } else {
      this.clickedHere(this.state.test)
    }
  }

  componentDidUpdate(){
    window.onpopstate  = (e) => {
      if(this.state.id ==null){
       this.showfolders()
       this.props.history.location.pathname ="/folders";
       this.props.history.push(`${this.props.history.location.pathname}`);
      }
      else{
         this.clickedHere(this.state.id)
      }
     }
  }

  showfolders = () => {
    let storeURL = ('http://localhost:8000/folders/');
    fetch(storeURL).then(response => response.json()).then(response=> {
    this.setState(
      {
        id:"",
        parent:"",
        result:response
      });
    this.props.history.location.pathname ="/folders";
    this.props.history.push(`${this.props.history.location.pathname}`);
  
     })
  }

  clickedHere(id){
  let storeURL = (`http://localhost:8000/folders/?id=${id}`)

   if(this.props.history.location.pathname == '/folders') {
   this.props.history.push(`${this.props.history.location.pathname}/${id}`);
   }
   else {
    this.props.history.location.pathname ="/folders";
    this.props.history.push(`${this.props.history.location.pathname}/${id}`);
   }
    console.log("test1",this.props.history.location)
    fetch(storeURL).then(response => response.json()).then(response => {
    console.log(response);
    this.setState(
      {
        result:response[0].child[0],
        parent:id,
        id:response[0].parent
      });
    }); 
   }

   delete(id,parent){

         let storeURL = (`http://localhost:8000/folders/?id=${id}`)

         if (parent == null){
               fetch(storeURL,{method:"delete"}).then(res => this.showfolders()); 
           }
         else{
             fetch(storeURL,{method:"delete"}).then(res =>this.clickedHere(parent));     
           }     

    }

    edit(id,parent){
      let storeURL = ("http://localhost:8000/folders/")
      let newfoldername = prompt("Enter new folder name")
      let json = {
                      'name':newfoldername,
                      'id':id
                  }
        if (parent==null)
        {
           fetch(storeURL,{ method: "put",
                            body: JSON.stringify(json), 
                            headers: new Headers({'Content-Type': 'application/json'})
              }).then(res => this.showfolders()) 
        }

        else{
           fetch(storeURL,{ method: "put",
                             body: JSON.stringify(json), 
                             headers: new Headers({'Content-Type': 'application/json'})
              }).then(res => this.clickedHere(parent)) 
           }     
      }        

      addfolders = (id,parent) => {
          var foldername = prompt("Enter new folder name")
          var json = {
                        "name" : foldername,
                        "parent" : parent
                     }
          let storeURL = ('http://localhost:8000/folders/')
       
         if (parent == "")
          {
             fetch(storeURL,{ method: "post",
                              body: JSON.stringify(json), 
                              headers: new Headers({'Content-Type': 'application/json'})
                }).then(res => this.showfolders()) 
          }

          else{
              fetch(storeURL,{ method: "post",
                               body: JSON.stringify(json), 
                               headers: new Headers({'Content-Type': 'application/json'})
                }).then(res => this.clickedHere(parent))
           
         }
       }

      back = (parent) => {
          if(parent==null)
          {
             this.showfolders()
          }
          else{
            this.clickedHere(parent)
          }
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

render(){
  
    return(
          <div className="format ">
               <div className="row row-top">
                 <div className="row">
                    <div className="col-md-offset-10 ">    
                        <button className="buttoncolor"><i className="fas fa-reply fa-2x" onClick={() => this.back(this.state.id)}></i></button> 
                        <button className="buttoncolor"> <i className="fas fa-folder-plus fa-2x" onClick={() => this.addfolders(this.state.id,this.state.parent)}></i> </button>                     
                    </div>  
                 </div>
               </div>  
       
               {this.state.result.map((data, idx) => {
                  return (
                     <div key={data.id}  className ="inner-format"> 
                   
                         <div className ="row rowhighlight" onMouseEnter={() =>this.showhover(data.id)} onMouseLeave={() =>this.showhoverout()} onClick={() => this.clickedHere(data.id)}>  
                           
                            <div className="col-md-2">                                         
                                <img src={foldericon} height="50" width="50" align="left"/>
                            </div>
                      
                             <div className="col-md-6 text">
                                {data.name}
                             </div>
                                                     
                             {this.state.hover_id === data.id  ? 
                                <span>
                                    <button><i className="far fa-trash-alt fa-lg padding10" onClick={() => this.delete(data.id,data.parent)}></i></button>&nbsp;&nbsp;
                                    <button><i className="far fa-edit fa-lg padding10" onClick={() => this.edit(data.id,data.parent)}></i> </button>
                                </span> : <span> </span>
                              }
                          </div> 
                      </div>
                         );           
                 })}

           
          </div>          
       
    )
 }
}
