import React  , {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Textchat from './Textchat.js'
import Main from './Main.js'
import AccountSettings from './AccountSettings.js'

class Content extends Component{
	
	constructor(props) {
	    super(props);
	    this.state = {
	      test : this.props.test,
	      images : this.props.images,
          captureFile : this.props.captureFile,
          uploadImage : this.props.uploadImage,
          tipImageOwner : this.props.tipImageOwner,
          account:  this.props.account,
          username: this.props.username,
          birthday: this.props.bday,
          usernameCallback: this.props.usernameCallback,
          usernameCallback1: this.props.usernameCallback1
	    }

  	}

	render() {
		return(
			<Switch>
				<Route exact path = '/' render = {(props) => <Main {...props}
																images = {this.props.images}
          														captureFile = {this.props.captureFile}
														        uploadImage = {this.props.uploadImage}
														        test= {this.props.test}
														        tipImageOwner = {this.props.tipImageOwner} />}></Route>

				<Route exact path = '/Textchat' render= {(props) => <Textchat {...props} test= {this.state.test} />} ></Route>
				<Route  exact path = '/AccountSettings' render = {(props) =>  <AccountSettings {...props} 	account = {this.props.account}
																											username = {this.props.username}
																											bday = {this.props.bday}
																											usernameCallback= {this.props.usernameCallback}
																											usernameCallback1= {this.props.usernameCallback1}
																											/>}></Route>
			</Switch>
		)
	}
}

export default Content;
