import React, {Component} from 'react';
import Web3 from 'web3';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Content from './Content'


const ipfsClient = require('ipfs-http-client')
const ipfs  = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})


class App extends Component{



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
    console.log(accounts)
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if (networkData) {
          const decentragram =  web3.eth.Contract(Decentragram.abi, networkData.address)
          this.setState({decentragram})
          const imagesCount = await decentragram.methods.imageCount().call()
          this.setState({imagesCount})
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


            const useTest = await decentragram.methods.ipfsHash().call()
            console.log(useTest)
            if (useTest.length < 3) {
              console.log('name non initialized')
            } else {
            console.log(JSON.parse(await ipfs.cat(useTest)))
            const user1 = JSON.parse(await ipfs.cat(useTest))
            this.setState({ 
              username: [...this.state.username, user1.name]
            })
            console.log(user1.name)
            }

            const useTest1 = await decentragram.methods.ipfsHash1().call()
            console.log(useTest1)
            if (useTest1.length < 3){
              console.log('bday non initialized')
            } else {
              console.log(JSON.parse(await ipfs.cat(useTest1)))
              const user2 = JSON.parse(await ipfs.cat(useTest1))
              this.setState({ 
                bday: [...this.state.bday, user2.bday]
              })
              console.log(user2.bday)
              this.setState({loading: false})
            }

    }else{
      window.alert('Decentragram  contract not deployed to detected network')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    console.log(file)
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


  handleChange = (event) => {
    const username_name = event
    //console.log(username_name)
    this.setState({username: username_name})
    console.log(this.state.username)
    const data = JSON.stringify({
      name : username_name
    })
    var data1 = Buffer.from(data)
    console.log(data1)
    //adding file to the IPFS
    const ipfsHash = ipfs.add(data1, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.state.decentragram.methods.setHash(result[0].hash).send({from: this.state.account})
    console.log(ipfsHash)
    console.log('new name ', this.state.username)
    })
  }

  handleChange1 = (event) => {
    const user_birthday = event
    //console.log(username_name)
    this.setState({bday: user_birthday})
    console.log(this.state.bday)
    const data = JSON.stringify({
      bday : user_birthday
    })
    var data2 = Buffer.from(data)
    console.log(data2)
    //adding file to the IPFS
    const ipfsHash1 = ipfs.add(data2, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.state.decentragram.methods.setHash1(result[0].hash).send({from: this.state.account})
    console.log(ipfsHash1)
    })
  }




  constructor(props) {
    super(props)
    this.state = {
      account: '',
      decentragram: null,
      images: [], 
      loading: true,
      test1: 'coucou',
      username: "", 
      bday: ""
    }

  }

  render() {
    return (
      <div>
        <Navbar test={this.state.test1} />
        <Content
          test = {this.state.test1}
          images = {this.state.images}
          captureFile = {this.captureFile}
          uploadImage = {this.uploadImage}
          tipImageOwner = {this.tipImageOwner} 
          username = {this.state.username}
          bday = {this.state.bday}
          account = {this.state.account}
          usernameCallback = {this.handleChange}
          usernameCallback1 = {this.handleChange1}
        />
        
      </div>
    );
  }
}


export default (App);






































