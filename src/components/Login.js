import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import User from '../abis/User.json'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const history = useNavigate();

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
    const networkData = User.networks[networkId];
    if (networkData) {
      const abi = User.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const web3 = window.web3;

    if (username === 'admin' && password === 'admin') {
      setError('');
      history('/Admin');
    } else if (contract) {
     
      contract.methods.getUser(username, password, account)
        .call()
        .then(result => {
          console.log(result);
            console.log(username);
            console.log(password);
            console.log(account);
          if (result) {
            
            history('/App');
          } else {
            setError('Invalid username or password');
          }
        })
        .catch(error => {
          console.error(error);
          setError('An error occurred');
        });
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;