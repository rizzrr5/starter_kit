import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import User from '../abis/User.json';
import Iprm from '../abis/Iprm.json';
import Coursework from '../abis/CourseWork.json';
import Logout from './Logout';

const CourseworkSubmissionForm = () => {
  const [courseWorkName, setCourseWorkName] = useState('');
  const [courseworkId, setCourseworkId] = useState('');
  const [contract, setContract] = useState(null);
  const [contract1, setContract1] = useState(null);
  const [contract2, setContract2] = useState(null);
  const [account, setAccount] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [fetchedCoursework, setFetchedCoursework] = useState(false);
  const [submissionResults, setSubmissionResults] = useState({});

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
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
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
    }

    const networkData1 = User.networks[networkId];
    if (networkData1) {
      const abi1 = User.abi;
      const address1 = networkData1.address;
      const contract1 = new web3.eth.Contract(abi1, address1);
      setContract1(contract1);
    }
    const networkData2 = Iprm.networks[networkId];
    if (networkData2) {
      const abi2 = Iprm.abi;
      const address2 = networkData2.address;
      const contract2 = new web3.eth.Contract(abi2, address2);
      setContract2(contract2);
    }
  }

  const fetchCoursework = async () => {
    if (!contract) {
      return;
    }
    try {
      const moduleLeaderCoursework = await contract.methods.getModCourseWork(account).call();
      setUserSubmissions(moduleLeaderCoursework);
      setFetchedCoursework(true);
    } catch (error) {
      console.error('Error fetching coursework:', error);
      alert('Error fetching coursework. Please check the console for details.');
    }
  };

  const getSubmission = async (courseworkId) => {
    try {
      if (!contract2) {
        return;
      }
      const submissionResult = await contract2.methods.submission(courseworkId).call();
      setSubmissionResults((prevResults) => ({
        ...prevResults,
        [courseworkId]: submissionResult,
      }));
    } catch (error) {
      console.error('Error fetching submission:', error);
      alert('Error fetching submission. Please check the console for details.');
    }
  };

  const clearSubmissionResult = () => {
    setSubmissionResults({});
  };

  const submitCoursework = async () => {
    try {
      if (!contract1) {
        return;
      }
      const web3 = window.web3;
      
      const courseName = await contract1.methods.getUsercourse(account).call();
      const startTime = performance.now();
      await contract.methods.submitCoursework(courseWorkName, account, courseworkId, courseName).send({ from: account });
      const endTime = performance.now();

    // Calculate the time difference in milliseconds
    const elapsedTime = endTime - startTime;

    console.log("Time taken (milliseconds):", elapsedTime);

      alert('Coursework submitted successfully!');
    } catch (error) {
      console.error('Error submitting coursework:', error);
      alert('Error submitting coursework. Please check the console for details.');
    }
  };

  const infuraBaseUrl = 'https://intellectualpropertyrights.infura-ipfs.io/ipfs/';

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
             <small className="text-white">{account}</small>
           </li>
          </ul>
            <div>
        {/* Other navigation links */}
        <Logout />
      </div>
        </nav>
      <h1>Submit Coursework</h1>
      <form>
        <label>Coursework Name:</label>
        <input type="text" value={courseWorkName} onChange={(e) => setCourseWorkName(e.target.value)} required />
        <br />

        <label>Coursework ID:</label>
        <input type="text" value={courseworkId} onChange={(e) => setCourseworkId(e.target.value)} required />
        <br />

        <button type="button" onClick={submitCoursework}>Submit Coursework</button>
      </form>

      <div>
        <button type="button" onClick={fetchCoursework}>Fetch Coursework</button>
        {userSubmissions != null && fetchedCoursework && (
          <div>
            <h2>My Coursework Submissions:</h2>
            <ul>
              {userSubmissions.map((courseworkId, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => {
                      clearSubmissionResult();
                      getSubmission(courseworkId);
                    }}
                  >
                    {courseworkId}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {submissionResults && Object.keys(submissionResults).length > 0 && (
        <div>
          <h2>Submission Results:</h2>
          <ul>
            {Object.entries(submissionResults).map(([courseworkId, results], index) => (
              <div key={index}>
                <h3>Coursework ID: {courseworkId}</h3>
                <ul>
                  {results.filter(result => result !== null && result !="").map((result, index) => (
                    <li key={index}>
                      <a href={`${infuraBaseUrl}${result}`} target="_blank" rel="noopener noreferrer">
                         {result}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseworkSubmissionForm;