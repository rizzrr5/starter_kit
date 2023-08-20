import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import User from '../abis/User.json'
import Coursework from '../abis/CourseWork.json'

const CourseworkSubmissionForm = () => {
  const [courseWorkName, setCourseWorkName] = useState('');
  const [moduleLeaderAddress, setModuleLeaderAddress] = useState('');
  const [courseworkId, setCourseworkId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      // await window.ethereum.enable()
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('User denied account access');
    }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Please use a web3-enabled browser');
    }
  }


  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Coursework.networks[networkId];
    if (networkData) {
      const abi = Coursework.abi;
      const address = networkData.address;
      console.log(address)
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
    }
  }
    const submitCoursework = async () => {
    try {
    	if(!contract){
    		return
    	}
      // Check if MetaMask is available
     const web3 = window.web3;
     console.log(account)
        // Send transaction
        await contract.methods.submitCoursework(courseWorkName, moduleLeaderAddress, courseworkId, courseName).send({ from:account});

        alert('Coursework submitted successfully!');
      } 
     catch (error) {
      console.error('Error submitting coursework:', error);
      alert('Error submitting coursework. Please check the console for details.');
    }
}
  return (
    <div>
      <h1>Submit Coursework</h1>
      <form>
        <label>Coursework Name:</label>
        <input type="text" value={courseWorkName} onChange={e => setCourseWorkName(e.target.value)} required /><br />

        <label>Module Leader Address:</label>
        <input type="text" value={moduleLeaderAddress} onChange={e => setModuleLeaderAddress(e.target.value)} required /><br />

        <label>Coursework ID:</label>
        <input type="text" value={courseworkId} onChange={e => setCourseworkId(e.target.value)} required /><br />

        <label>Course Name:</label>
        <input type="text" value={courseName} onChange={e => setCourseName(e.target.value)} required /><br />

        <button type="button" onClick={submitCoursework}>Submit Coursework</button>
      </form>
    </div>
  );
};
export default CourseworkSubmissionForm;