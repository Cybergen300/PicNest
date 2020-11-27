import React  , {Component} from 'react'
import './Navbar.css'
import dev from '../dev.jpg'



class Textchat extends Component{

constructor(props) {
    super(props);
   	this.state = {
	    test : this.props.test
	}
	console.log("test from test Exchange:", this.state.test)
  }

	render() {
		return(
			<img src={dev} width="100%" height="100%" className="d-inline-block align-top" alt="maintenance_picture" />


		)
	}
}

export default Textchat;
