import React, {Component} from 'react'
import './style.css'

import {PaneButton} from '../button/'



export class SearchBox extends Component{

	constructor(props){
		super(props)
		this.state = {
			data:[],
			all_data:[],
			feature_name:'',
			target_name:'',
			clearButton_appearnace:false
		}
	}

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
		this.setState({data:this.props.data, all_data: this.props.data, feature_name:this.props.feature_name, target_name:this.props.target_name})
		
	}


	onSearch = async(event) =>{
		//getting query data
		var search_query = event.target.value
		if(search_query !== '' || this.state.data.length === 0){
			this.setState({
				data:this.state.all_data
			})
		}
		
		//get feature name for e.g, org -> organizations, users -> organizations
		
		const {feature_name} = await this.state;
		const {target_name} = await this.state;
		var search_value = ''
		var filtered_data = await this.state.all_data.filter(function(el){
			
			if(feature_name !== undefined){
				if (feature_name === 'orgs' || feature_name === 'roles'){
					search_value = el.name.toLowerCase();
					return search_value.indexOf(search_query.toLowerCase())!== -1;
				}
				if(feature_name === 'users'){
					search_value = el.username.toLowerCase();
					return search_value.indexOf(search_query.toLowerCase())!== -1;
				}
			}

			if(target_name !== undefined){
				if (target_name === 'orgs' || target_name === 'roles' || target_name === 'permissions'){
					search_value = el.name.toLowerCase();
					return search_value.indexOf(search_query.toLowerCase())!== -1;
				}
				if(target_name === 'users'){
					search_value = el.username.toLowerCase();
					return search_value.indexOf(search_query.toLowerCase())!== -1;
				}
			}
		});
		//setting the filtered data to the state
		
		if(search_query === ''){
			this.setState({
				clearButton_appearnace:false,
				data:filtered_data
			})
		}else{
			this.setState({
				clearButton_appearnace:true,
				data:filtered_data
			})
		}
		//passing state to parent
		this.props.callbackFromParent(this.state.data)
	}


	clearButton = async()=>{
		document.getElementById('searchQuery').value = '';
		if(this.state.data.length === 0){
			this.setState({
				data:this.state.all_data
			})
		}
		//passing state to parent
		this.props.callbackFromParent(this.state.data)
	} 

	render(){
		console.log(this.state.clearButton_appearnace)
		return(

			<div className="col-md-12 search-box" >
				<div>
					<span className="input-group-text">
						<i className="fas fa-search"></i>
						<input className ="search-input" type="text" id='searchQuery' placeholder="filter..." onChange={(e)=>this.onSearch(e)}/>
						<i className={this.state.clearButton_appearnace?"far fa-times-circle":'hide'} id="clearBut" onClick={() => this.clearButton()}></i>
					</span>
			  	</div>
			</div>

		)
	}
}

export class SearchTarget extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			selected_id:null,
			selected_name:'',
		}
	}

	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps

	}

	on_select = async(event) =>{
		
		await this.setState({
			selected_id:event.target.id,
			selected_name:event.target.innerHTML
		})
		
		this.props.callbackFromParent(this.state.selected_id, this.state.selected_name)

	}

	on_select_all = async() =>{
		// console.log('on_select_all')
		this.props.get_multi_select()
	}

	render(){

		let {data, feature_name} = this.props;
		//console.log(this.props.data)
		//console.log(feature_name === 'orgs'?this.state.selected_id===data[0].org_id?'bx-record capital-case highlight':'bx-record capital-case highlight':'bx-record capital-case')
		let sel_id, ele_id, condition_res, class_default, class_highlighted;
		return(
				<div className="col-md-12 content-box">
					{
						this.props.input_box?<input className ="bx-record-child" type="text" ref={input => input && input.focus()} id="new_record" placeholder="new record" />:null
					}
					{
						data !== null?
						data.map((ele)=>(
							
							sel_id = this.state.selected_id,
							
							class_default = 'bx-record capital-case',
							class_highlighted = 'bx-record capital-case highlight',

							ele_id = feature_name === 'orgs'?ele.org_id:ele.id,
							condition_res = sel_id !== null?sel_id.includes(ele_id)?class_highlighted:class_default:class_default, 
							
							<div key={feature_name === 'orgs'?ele.org_id:ele.id} id={feature_name === 'orgs'?ele.org_id:ele.id} className={condition_res} onClick={(e)=>this.on_select(e)}>
							
								{feature_name === 'users'?ele.email:ele.name}

							</div>	
					
							)
						)	
						:<div  className='bx-record capital-case highlight' >No record found</div>	
					}
					
				</div>			
		)
	}
}

export class CheckSearchTarget extends Component{

	constructor(props){
		super(props)
		this.state = {
			selected_collection:[],
			checked_box:false,
			assigned_user_ids:[]
		}
		this.assign = []
		this.remove = []
	}

	
	componentWillReceiveProps = async(nextProps) => {
		this.props = nextProps
		this.setState({
			selected_collection:nextProps.assigned_user_ids,
			assigned_user_ids:nextProps.assigned_user_ids
		})
		this.assign = []
		this.remove = []
	}

	select_user = async(id) =>{

		if((!this.state.selected_collection.includes(id)) && !this.state.checked_box){
			
			if(!this.props.assigned_user_ids.includes(id))
				this.assign.push(id)
			if(this.remove.includes(id))
					this.remove.splice(this.remove.indexOf(id),1)

			await this.setState({
				selected_collection:[...this.state.selected_collection, id]
			})
		}
		else{
			if(this.props.assigned_user_ids.includes(id))
				this.remove.push(id)

			if(this.assign.includes(id))
					this.assign.splice(this.assign.indexOf(id),1)

			let a = this.state.selected_collection;
			a.splice(a.indexOf(id), 1)
			this.setState({selected_collection:a})
		}
	
		// console.log(this.assign, this.remove)
		//console.log(this.state.selected_collection)
		this.props.callbackFromParent(this.assign, this.remove)
		
	}

	render(){

		const {target_data, target_name} = this.props;
		
		return(
				<div className="col-md-12 content-box-checked scroll-container">
					
				{
					target_data !== null && this.state.selected_collection !== undefined?
						target_data.map((ele, i)=>(

							<div className="row" key={ele.id}>
								<div className="checkbox-record">
									<div className="col-md-2">
										<input id={target_name === 'orgs'?ele.org_id:ele.id}  type="checkbox" onChange={()=>this.select_user(target_name === 'orgs'?ele.org_id:ele.id)} checked={this.state.selected_collection.includes(target_name === 'orgs'?ele.org_id:ele.id)?true:false}/> 
									</div>
									<div className="col-md-6">
										<span className={this.state.selected_collection.includes(target_name === 'orgs'?ele.org_id:ele.id)?'green':null}>{target_name === 'users'?ele.email:ele.name} </span>
									</div>
								</div>
							</div>
							

							)
							
					):null
				}	
				
				</div>	
		 )
	}
}

