import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
// import ipfsClient from 'ipfs-http-client';
import { create } from 'ipfs-http-client';
import Web3 from 'web3';
import Iprm from '../abis/Iprm.json'
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
    this.setState({account:accounts[1]},()=>{
      console.log(this.state.account)
    })
    const networkid=await web3.eth.net.getId()
    // console.log(networkid)
    const networkData=await Iprm.networks[networkid]
    if(networkData){
      const abi=Iprm.abi
      const address=networkData.address
      // console.log(address)
      const contract=new web3.eth.Contract(abi,address)
      this.setState({contract:contract},async ()=>{
      })  
      const hash = await contract.methods.get().call();
    // console.log('hashs',hash);
    this.setState({result:hash},()=>{
    })   
    }
    else{
      window.alert('wrong network')
    }
   
    
  }
  constructor(props){
    super(props);
    this.state={
      account:'',
      url:'https://intellectualpropertyrights.infura-ipfs.io/ipfs/',
      buffer:null,
      contract:null,
       result: localStorage.getItem("ipfsHash") || null,
       transactionHash:localStorage.getItem("transactionHash") || null, // Load from localStorage
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
      const web3=window.web3
    // console.log('submit form.')
      ipfs.add( this.state.buffer).then((result)=>{
        // console.log(result)
        
        const hash=result.path


        this.state.contract.methods.set(hash).send({from:this.state.account}).on("transactionHash", (txHash) => {
          console.log("Transaction Hash:", txHash);
          // Transaction hash is available here, you can use it as needed
          this.setState({ transactionHash: txHash });
          localStorage.setItem("transactionHash", txHash);
            this.state.contract.events.DocumentSubmitted({}, (error, event) => {
                    if (!error) {
                        console.log('Document submitted event:', event.returnValues.sender, event.returnValues.documentHash, event.returnValues.name,event.returnValues.timestamp);
                        // You can update your UI or take any action based on the event here
                    } else {
                        console.log("Error in DocumentSubmitted event:", error);
                    }
                });
        }).then((r)=>{
          this.setState({ result :hash}, () => {
            console.log("the final result is", this.state.result);
            localStorage.setItem("ipfsHash", this.state.result);
            const transactionHash1 = this.state.transactionHash
            web3.eth.getTransaction(transactionHash1).then((transaction)=>{
                const blockNumber = transaction.blockNumber;
                const input=transaction.input;
                 console.log('Transaction Data:', input);
                web3.eth.getBlock(blockNumber).then((block) => {
                  console.log("blocknumber:",blockNumber)
                  console.log("block",block)
                const timestamp = block.timestamp;
                console.log('Timestamp:', timestamp);
                const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
              console.log(date.toUTCString());
              });

              console.log('Transaction details:', transaction); 
            }).catch((error) => {
    console.log("Error sending2 transaction:", error);
  }); 
    // Any code that relies on the updated state can be placed here.
    });

    }).catch((error) => {
    console.log("Error sending transaction:", error);
  }); 
    })

  }
  render() {
     const infuraBaseUrl = 'https://intellectualpropertyrights.infura-ipfs.io/ipfs/';
    const dynamicLink = infuraBaseUrl + this.state.result;
    

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
          <div className="App">
        <h1>IPFS Content Viewer</h1>
        <button onClick={() => window.open(dynamicLink, '_blank')}>
          View IPFS Content
        </button>
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
