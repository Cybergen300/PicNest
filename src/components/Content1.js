import React  , {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Textchat from './Textchat.js'
import Main from './Main.js'
import AccountSettings from './AccountSettings.js'

const ipfsClient = require('ipfs-http-client')
const ipfs  = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

class Content1 extends Component{

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non_ethereum browser detected, you should consider trying Metamask')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState ({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if (networkData) {
          const decentragram =  web3.eth.Contract(Decentragram.abi, networkData.address)
          this.setState({decentragram})
          const imagesCount = await decentragram.methods.imageCount().call()
          this.setState({imagesCount})
          console.log(imagesCount.toString())
          for (var i =1; i <= imagesCount; i++) {
            const image = await decentragram.methods.images(i).call()
            this.setState({
              images: [...this.state.images, image]
            })
          }

          //Sort images : show highest tipped first 
          this.setState({
            images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount)
          })
          console.log("Content1 nb of images:", this.state.images)

          this.setState({loading: false})



    }else{
      window.alert('Decentragram  contract not deployed to detected network')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result) })
      console.log('buffer',  this.state.buffer)
    }
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({loading: true})
      this.state.decentragram.methods.uploadImage(result[0].hash, description).send({from: this.state.account}).on('transactionHash',  (hash) => {
        this.setState({loading: false})
      })
    })
  }

  tipImageOwner = (id, tipAmount) => {
    this.setState({loading: true})
    this.state.decentragram.methods.tipImageOwner(id).send({from: this.state.account, value: tipAmount}).on('transactionHash',  (hash) => {
      this.setState({loading:false})
    })
  }

  test = () => {
    console.log("nb of images:", this.state.images)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      decentragram: null,
      images: [], 
      loading: true,
      test1: 'coucou'
    }

  }

	render() {
		return(
			<Switch>
				<Route exact path = '/' render = {(props) => <Main {...props}
																images = {this.state.images}
          														captureFile = {this.state.captureFile}
														        uploadImage = {this.state.uploadImage}
														        test= {this.state.test}
														        tipImageOwner = {this.state.tipImageOwner} />}></Route>

				<Route exact path = '/Textchat' render= {(props) => <Textchat {...props} test= {this.state.test} />} ></Route>
				<Route  exact path = '/AccountSettings' component = {AccountSettings}></Route>
			</Switch>
		)
	}
}

export default Content1;
