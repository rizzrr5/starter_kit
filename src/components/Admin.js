import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Web3 from 'web3';
import User from '../abis/User.json'
class AdminRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ' ',
      contract:null,
      username: ' ',
      password: '',
      universityId: ''
    };
  }
   
async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()


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
    console.log(window.web3)
  }
  async loadBlockchainData(){
    const web3=window.web3
    const accounts=await web3.eth.getAccounts()
    this.setState({account:accounts[0]},()=>{
      console.log("this account",this.state.account)
    })
    const networkid=await web3.eth.net.getId()
    // console.log(networkid)
    const networkData=await User.networks[networkid]
    // console.log(networkid)
    // const networkData=await Iprm.networks[networkid]
    if(networkData){
      const abi=User.abi
      const address=networkData.address
      // console.log(address)
      const contract=new web3.eth.Contract(abi,address)
      this.setState({contract:contract},async ()=>{
      })  
    //   const hash = await contract.methods.get().call();
    // // console.log('hashs',hash);
    // this.setState({result:hash},()=>{
    // })   
    // }
    // else{
    //   window.alert('wrong network')
    // }
   
    
  }
}
  handleSubmit = async (e) => {
    e.preventDefault();
    // You can add your logic to handle form submission, e.g., sending data to the backend
        const web3=window.web3;
         const newUserAccount = web3.eth.accounts.create();
        const newUserAddress = newUserAccount.address;
        // const accounts=await web3.eth.getAccounts
        // const newUserAccount=accounts[6];
        // const newUserAddress=newUserAccount
        const newUserPrivateKey = newUserAccount.privateKey; 
        const _name=this.state.name;
        const _username=this.state.username;
        const _password=this.state.password;
        const _uid=this.state.universityId
        console.log("user address",newUserAddress)
        console.log("privateKey",newUserPrivateKey)
        web3.eth.sendTransaction({from: this.state.account, to: newUserAddress, value: web3.utils.toWei('1', "ether")})
        this.state.contract.methods.addUser(_name,_password,newUserAddress,_uid).send({from:this.state.account}).on("transactionHash", (txHash) => {
          console.log("Transaction Hash:", txHash);
          // Transaction hash is available here, you can use it as needed
          this.setState({ transactionHash: txHash });
        }).catch((error) => {
    console.log("Error sending transaction:", error);
  }); 

    // After successful registration, navigate to a new page or display a success message
    // Replace with the desired URL
  }

  render() {
    const { name, username, password, universityId } = this.state;

    return (
      <div className="container mt-5">
        <h2>Admin Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => this.setState({ name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" value={username} onChange={(e) => this.setState({ username: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label htmlFor="universityId" className="form-label">University ID</label>
            <input type="number" className="form-control" id="universityId" value={universityId} onChange={(e) => this.setState({ universityId: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
  }
}

export default AdminRegistrationForm;