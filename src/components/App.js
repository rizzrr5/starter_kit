import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
// import ipfsClient from 'ipfs-http-client';
import { create } from 'ipfs-http-client';
import Web3 from 'web3';
// const ipfsClient=require('ipfs-http-client')
// const ipfsClient=create();
const projectId = '2TMLGJoTk4XnSGFp8vouWejROB4';
const projectSecret = '56bd663ece086b2320374a721e4bc015';
const auth =
    'Basic ' + btoa(projectId + ":" + projectSecret)
const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https',
  headers: {
        authorization: auth,
    }, })

class App extends Component {

  async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3=window.web3
    const accounts=await web3.eth.getAccounts()
    this.setState({account:accounts[0]},()=>{
      console.log(this.state.account)
    })
   
    
  }
  constructor(props){
    super(props);
    this.state={
      account:'',
      buffer:null,
      result:null
    };
  }

  async loadWeb3(){
    if(window.ethereum){
      window.web3=new Web3(window.ethereum)
      // await window.ethereum.enable()
       await window.eth_requestAccounts

    }if(window.web3){
      window.web3=new Web3(window.web3.currentProvider)
    }else{
      window.alert('please use')
    }
  }
  captureFile =(event)=>{
    event.preventDefault()
    const file=event.target.files[0]
    const reader= new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend=()=>{
      const bufferView = new Uint8Array(reader.result);
      this.setState({buffer:bufferView})
    }


  }
  //QmbBr4TjPrT7NiM7PLwxpp9waaem2owmrR1njjM71Dcqep
  onSubmit=(event)=>{
    event.preventDefault()
    // console.log('submit form.')
    ipfs.add( this.state.buffer).then((result)=>{
      this.setState({ result }, () => {
    console.log("the final result is", this.state.result);
    // Any code that relies on the updated state can be placed here.
  });
   

    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            IPRM
          </a>
          <ul className="navbar-nav px-3">
           <li className="nav-item text-nowrap d-none d-sm-block">
             <small className="text-white">{this.state.account}</small>
           </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex  justify-content-center ">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
             <h2>File Submission</h2>
             <form onSubmit={this.onSubmit} >

               <input type='file' onChange={this.captureFile} />
               <input type='submit'/>
             </form>
              {this.state.result && (
          <div>
            <h3>IPFS Result</h3>
            {this.state.result.path && <p>File path: {this.state.result.path}</p>}
            {this.state.result.cid && <p>CID: {this.state.result.cid.toString()}</p>}
          </div>
        )}
               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
