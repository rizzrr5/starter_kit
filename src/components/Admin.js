import React, { Component } from 'react';
import { withRouter,usehistory } from 'react-router-dom';
import Web3 from 'web3';
import './App.css';
import User from '../abis/User.json'
import Logout from './Logout';
class AdminRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ' ',
      contract:null,
      username: ' ',
      password: '',
      universityId: '',
      account:null,
      role:'Student',
      coursename:'Cybersecurity',
      allUsers: [],
      selectedUserAddress: null,
    };
    // const history=usehistory();
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
 handleLogout = () => {
    // Implement your logout logic here, such as clearing tokens, sessions, etc.
    // For example, you might use localStorage or sessionStorage to store tokens.
    localStorage.removeItem('authToken'); // Clear the authentication token

    // Redirect the user to the login or home page
    window.location.href = '/login'; // Replace with your login page URL
  };
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
        const _uid=this.state.universityId;
        console.log("the role is",this.state.role)
        const _role=this.state.role;
        const _coursename=this.state.coursename
        console.log("user address",newUserAddress)
        console.log("privateKey",newUserPrivateKey)
       try{
         await web3.eth.sendTransaction({from: this.state.account, to: newUserAddress, value: web3.utils.toWei('1', "ether")})
         const startTime = performance.now();
        this.state.contract.methods.addUser(_name,_password,newUserAddress,_uid,_coursename,_role).send({from:this.state.account}).on("transactionHash", (txHash) => {
           const endTime = performance.now();

    // Calculate the time difference in milliseconds
    const elapsedTime = endTime - startTime;

    console.log("Time taken (milliseconds):", elapsedTime);
          console.log("Transaction Hash:", txHash);
          // Transaction hash is available here, you can use it as needed
          this.setState({ transactionHash: txHash });
        }).catch((error) => {
    console.log("Error sending transaction:", error);
  }); 
      }catch(error){
        console.log('Error sending or processing transaction:', error);
  if (error.message.includes('revert')) {
    console.log('Transaction was rejected or reverted.');
    // You can handle the rejection/revert here as needed
  }
      }

    // After successful registration, navigate to a new page or display a success message
    // Replace with the desired URL
  }
  fetchAllUsers = async () => {
    const { contract } = this.state;

    if (!contract) {
      return;
    }

    try {
      const allUsers = await contract.methods.getAllUsers().call();
      this.setState({ allUsers });
      console.log("Users",allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
deleteUser = async (ethAddress) => {
    const { contract } = this.state;

    if (!contract) {
      return;
    }

    try {
      console.log(ethAddress)
      await this.state.contract.methods.deleteUser(ethAddress).send({from:this.state.account});
    
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  render() {
    const { name, username, password, universityId,role,coursename,selectedUserAddress } = this.state;

    return (
      <div className="container mt-5">
          <div>
        {/* Other navigation links */}
        <Logout />
      </div>
        <h2>Admin Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => this.setState({ name: e.target.value })} required autoComplete="off" />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" value={username} onChange={(e) => this.setState({ username: e.target.value })} required autoComplete="off" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label htmlFor="universityId" className="form-label">University ID</label>
            <input type="number" className="form-control" id="universityId" value={universityId} onChange={(e) => this.setState({ universityId: e.target.value })} required autoComplete="off" />
          </div>
            <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              value={role}
              onChange={(e) => this.setState({ role: e.target.value })}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
              <div className="mb-3">
            <label htmlFor="CourseName" className="form-label">
              Coursename
            </label>
            <select
              className="form-select"
              id="coursename"
              value={coursename}
              onChange={(e) => this.setState({ coursename: e.target.value })}
              required
            >
              <option value="" disabled>
                Select Coursename
              </option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="ComputerScience">Computer Science</option>
            </select>
          </div>
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
     <div className="container mt-5">
        {/* Form... */}
        <button type="button" className="btn btn-secondary" onClick={this.fetchAllUsers}>Fetch All Users</button>

        {/* Display generated user address */}
        {/* Display fetched user data */}
<div className="mt-3">
  <h3>All Users</h3>
  <ul>
    {this.state.allUsers.map((user, index) => (
      // Check if the Ethereum address starts with "0x000000"
      // If it does, don't render this user
      // Otherwise, render the user with the "Remove user" button
      !user.ethAddress.startsWith("0x000000") && (
        <li key={index}>
          Name: {user.name}, Address:{" "}
          <span>
            {user.ethAddress}{" "}
            <button
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => this.deleteUser(user.ethAddress)}
            >
              Remove user
            </button>
          </span>
        </li>
      )
    ))}
  </ul>
</div>
       
      </div>

      </div>
    );
  }
}

export default AdminRegistrationForm;