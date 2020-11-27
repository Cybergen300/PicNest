import React, { Component } from 'react';
import Identicon from 'identicon.js';
import bird from '../bird.png'
import  './Navbar.css'
import './App.js'


class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 bg-light" >
        <div className="row">
            <main role="main" className="col bg-light " style={{ maxWidth: '100%'}}>
              <div id = 'feed' className= 'h-scroll'>
                <div className="content mr-auto ml-auto">
                  <p>&nbsp;</p>

                  <p>&nbsp;</p>
                  {this.props.images.map((image, key) => {
                    return(
                      <div className= "card mb-5 feed" key = {key} style= {{maxWidth: '77%'}} >
                        <div className = "card-header">
                          <img className= 'mr-2'
                            width = '30'
                            height = '30'
                            src= {`data: image/png;base64,${new Identicon(image.author, 30).toString()}`}
                            alt = 'user_identicon'
                          />
                          <small className="text-muted">{image.author}</small>
                        </div>
                        <div className = "card-body ml-0-auto">
                          <ul id = "imageList" className= "list-group  list-group-flush">
                            <li className="list-group-item">
                              <img className = "card-img-top" 
                                    src = {`https://ipfs.infura.io/ipfs/${image.hash}`} 
                                    style={{ maxWidth: '100%' }}
                                    alt = "user_picture"/>
                              
                            </li>
                            <li key = {key} className= "list-group-item py-2">
                              <p> {image.description}</p>
                              <small  className="float-left mt-1 text-muted">
                                TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH 
                              </small>
                              <button 
                                className= "btn btn-link btn-sm float-right pt-0"
                                name = {image.id}
                                onClick= {(event) => {
                                  let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                                  console.log(event.target.name, tipAmount)
                                  this.props.tipImageOwner(event.target.name, tipAmount)
                                }}
                              >
                                TIP 0.1  ETH
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      )
                  })}
                </div>
              </div>
            </main>
            <div className="col mr-5 test" style={{ maxWidth: '30%'}}>
                  <p>&nbsp;</p>
                  <img className='mr-0' width='250' height='250' src={bird} alt = 'bird_icon' />
                  <h2 className=  "mt-4"> Hey there, </h2>
                  <h2> Let's start nesting !  </h2>
                  <form className = "mt-3" onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.imageDescription.value
                    this.props.uploadImage(description)
                  }} >
                    <input type = 'file' accept= ".jpg, .jpeg, .png, .bmp, .gif" onChange= {this.props.captureFile} />
                      <div className= "form-group mr-sm-2">
                      <br /> 
                        <input 
                          id = "imageDescription"
                          type  = "text"
                          ref= {(input) => {this.imageDescription = input}}
                          className= "form-control"
                          placeholder= "Tell us a  bit more about your picture ! 🐣"
                          required />
                      </div>
                    <button type= "submit" className= "btn btn-primary btn-block btn-lg"> Share it ! </button>
                  </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Main;


































