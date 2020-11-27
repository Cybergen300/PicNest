import React  , {Component} from 'react'
import './Navbar.css'
import bird from '../bird1.png'


class AccountSettings extends Component{


	onTrigger = (event) => {
		const UserName = this.target.value
		console.log(UserName)
		this.props.usernameCallback(UserName)
		event.preventDefault()
	}

	onTrigger1 = (event) => {
		const DateBirth = this.bday.value
		console.log(DateBirth)
		this.props.usernameCallback1(DateBirth)
		event.preventDefault()
	}

	constructor(props) {
		super(props)
		this.state = {
			account1 : this.props.account,
		}

	}

	render() {
		return(
			<div className="Account_setting bg-light">
				<div className= "accountHeader bg-white">
					<img className='ml-4' width='230' height='230' src={bird} alt = 'bird_icon1' />
					<h3 className ='user_picture'> Account Settings  </h3>
				</div>
				<hr />
				<p className = "test1 ml-2" > Account address : {this.props.account} </p>
				<p className ='ml-2'> user picName : {this.props.username}</p>
				<p className ='ml-2'> user birthday : {this.props.bday}</p>
				<form className= "form-inline ml-2">

				<div className = "form-group">
					<label > Picname : </label>
					<input 
						id = "target" 
						type = "text" 
						className ="form-control ml-2" 
						ref = {(input) => {this.target = input}}
						placeholder= "Choose a name"
					/>
					<button className= 'gorm-group ml-3' onClick = {this.onTrigger}> Save name </button>

				</div>
				</form>
				<form className= "form-inline ml-2 mt-4">
				<div className = "form-group">
					<label > Birthday : </label>
					<input 
						type = "date" 
						className ="form-control ml-2" 
						id= "bday" 
						ref = {(input) => {this.bday = input}}
						placeholder= "Choose a date"/>
				</div>
				<button className= 'gorm-group ml-3' onClick = {this.onTrigger1}> Save date </button>
				</form>

				<h3 className= 'mt-4 ml-2 subTitle'> Need some assistance ? </h3> 
				<p className="ml-2 paragraphe mt-3"> You can contact us by mail or directly get in touch with us via twitter 
				and we'll get back to you ASAP </p>


			</div>


		)
	}
}

export default AccountSettings;




































