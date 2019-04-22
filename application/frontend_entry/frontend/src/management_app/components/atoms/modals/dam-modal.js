import React, {Component} from 'react'
import './style.css'
export class ConfirmationModal extends Component{


	onClickConfirmationhandler = () =>{
		this.props.confimation_function()

	}


	render(){
		return(
		<div className="modal" id="confirmModal" tabIndex="-1" role="dialog">
		  <div className="modal-dialog modal-frame" role="document">
		      <div className="modal-body ">
		        <h5 className="modal-text">You are about to delete {this.props.target_name}. Are you sure you want to delete?</h5>
		      
		        <button type="button" className="btn modal-button" onClick={() => this.onClickConfirmationhandler()}>Delete</button>
		       
		        <button type="button" className="btn modal-button">Cancel</button>
		      </div>
		    </div>
		</div>
		)
	}
}

export class AlertModal extends Component{

	render(){
		return(
		<div className="modal" id="alertModal" tabIndex="-1" role="dialog">
		  <div className="modal-dialog modal-frame" role="document">
		      <div className="modal-body ">
		        <h5 className="modal-text-alert">{this.props.alert_message}!</h5>
		         <button type="button" className="btn modal-button">Continue</button>
		      </div>
		    </div>
		</div>
		)
	}
}