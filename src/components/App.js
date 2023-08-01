import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
// import ipfsClient from 'ipfs-http-client';
import { create } from 'ipfs-http-client';
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

  constructor(props){
    super(props);
    this.state={
      buffer:null,
      result:null
    };
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
      console.log("result",result)
      this.setState({result:result})
   

    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
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
