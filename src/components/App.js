import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
// import ipfsClient from 'ipfs-http-client';
import { create } from 'ipfs-http-client';
import Web3 from 'web3';
import Iprm from '../abis/Iprm.json';
import User from '../abis/User.json';
import CourseWork from '../abis/CourseWork.json';
import CryptoJS from 'crypto-js';
import Logout from './Logout';

// const ipfsClient=require('ipfs-http-client')
// const ipfsClient=create();
let ipfsHashToEncryptedData = {};
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
      console.log("acc",this.state.account)
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

      // const hash = await contract.methods.get().call();
    // console.log('hashs',hash);
    // this.setState({result:hash},()=>{
    // })   
    }

    else{
      window.alert('wrong network')
    }
    const networkData1=await User.networks[networkid]
    if(networkData1){ 
      const abi1=User.abi
      const address1=networkData1.address
      // console.log(address)
      const contract1=new web3.eth.Contract(abi1,address1)
      this.setState({contract1:contract1},async ()=>{
      })  

    //   const hash = await contract1.methods.get().call();
    // // console.log('hashs',hash);
    // this.setState({result:hash},()=>{
    // })   
    }
    const networkData2=await CourseWork.networks[networkid]
    if(networkData2){ 
      const abi2=CourseWork.abi
      const address2=networkData2.address
      // console.log(address)
      console.log("address2",address2)
      const contract2=new web3.eth.Contract(abi2,address2)
      this.setState({contract2:contract2},async ()=>{
        console.log("hi its done")
      })  

    //   const hash = await contract1.methods.get().call();
    // // console.log('hashs',hash);
    // this.setState({result:hash},()=>{
    // })   
    }
    
  }
  constructor(props){
    let ipfsHashToEncryptedData = {};
    super(props);
    this.state={
      account:'',
      url:'https://intellectualpropertyrights.infura-ipfs.io/ipfs/',
      buffer:null,
      contract:null,
      contract1:null,
      contract2:null,
      data:null,
       selectedSubmissionDetails: null,
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
  onSubmit=(courseworkId,event)=>{
      event.preventDefault()
      const web3=window.web3
      const startTime3=performance.now();
        const generatedKey1 = CryptoJS.lib.WordArray.random(128/8).toString();
        console.log(generatedKey1);
       console.log("this is the buffer",this.state.buffer);
//        const textDecoder = new TextDecoder('utf-8'); // Specify the encoding if known
// const originalText = textDecoder.decode(this.state.buffer);
// console.log(originalText);
// const generatedKey = '0x375b222bea5ea424341cd111c11230804963583224842497b02f3e44bfdcff39'; 
// Replace with your key
const generatedKey='2230acaf43a388f0285a3b749f375c18b5e7dd79a17932fca12228141c58926b'
const iv = CryptoJS.enc.Utf8.parse('I8zyA4lVhMCaJ5Kg');
const dataToEncrypt = CryptoJS.lib.WordArray.create(this.state.buffer);
console.log("the crypro form",dataToEncrypt);
// console.log("the string version",dataToEncrypt.toString());
// const decryptedWordArray2 = CryptoJS.enc.Utf8.parse(dataToEncrypt.toString());
// console.log(decryptedWordArray2);
// const base64String = CryptoJS.enc.Base64.stringify(dataToEncrypt);
// console.log("Base64-encoded string:", base64String.length);
// console.log("string lenght",dataToEncrypt.toString().length);
 // const decryptedBuffer1 = new Uint8Array(dataToEncrypt.toString().length);
 //   for (let i = 0; i < dataToEncrypt.toString().length; i++) {
 //     decryptedBuffer1[i] = dataToEncrypt.toString().charCodeAt(i);
 //  }
  // console.log("decrypted buffer",decryptedBuffer1);

const encryptedData = CryptoJS.AES.encrypt(
  dataToEncrypt,
  CryptoJS.enc.Utf8.parse(generatedKey),
  {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }
);

console.log("Encrypted Data:", encryptedData);
this.setState({data:encryptedData});
console.log(this.state.data);
const ciphertextWords = encryptedData.ciphertext.words;
console.log(ciphertextWords);
const ciphertextBytes = new Uint8Array(ciphertextWords.length * 4);
for (let i = 0; i < ciphertextWords.length; i++) {
  const word = ciphertextWords[i];
  for (let j = 0; j < 4; j++) {
    const byte = (word >> (j * 8)) & 0xff;
    ciphertextBytes[i * 4 + j] = byte;
  }
}
console.log(ciphertextBytes);
 const encryptedWordArray = CryptoJS.lib.WordArray.create(ciphertextBytes);
 console.log(encryptedWordArray);




    // console.log('submit form.')
    const startTime = performance.now();
      // ipfs.add( ciphertextBytes).then((result)=>{
        ipfs.add( this.state.buffer).then((result)=>{
        // console.log(result)
        const endTime = performance.now();

    // Calculate the time difference in milliseconds
    const elapsedTime = endTime - startTime;

    console.log("Time taken (milliseconds):", elapsedTime);
        const hash=result.path;
        ipfsHashToEncryptedData[hash] = encryptedData;
        console.log("trial",ipfsHashToEncryptedData[hash]);
  //       (async () => {
  //   for await (const chunk of ipfs.cat(hash)) {
  //     const content = chunk.toString();
  //     // console.log("Chunk of content:", content);
  //   }
  // })();
  

const startTime2 = performance.now();
        this.state.contract.methods.submit(hash,courseworkId,'0x73737fd55D89c851fd5496c8Ff295Ae1822b1E94').send({from:this.state.account}).on("transactionHash", (txHash) => {
          const endTime2 = performance.now();

    // Calculate the time difference in milliseconds
    const elapsedTime2 = endTime2 - startTime2;

    console.log("Time taken (milliseconds):", elapsedTime2);
          console.log("Transaction Hash:", txHash);
          // Transaction hash is available here, you can use it as needed
          this.setState({ transactionHash: txHash });
          localStorage.setItem("transactionHash", txHash);
            this.state.contract.events.DocumentSubmitted({}, (error, event) => {
                    if (!error) {
                        console.log('Document submitted event:', event.returnValues.sender, event.returnValues.ipfsHash, event.returnValues.courseId,Date(event.returnValues.timestamp*1000));
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
fetchUserSubmissions = async () => {
  const { contract } = this.state;

  if (!contract) {
    return;
  }

  const userSubmissions1 = await contract.methods.getUserSubmissions().call({ from: this.state.account });
  console.log(userSubmissions1)



      // console.log("Decrypted Submissions:", decryptedSubmissions);
    this.setState({ userSubmissions: userSubmissions1 });

};
 decryptData(encryptedData) {
  
   const generatedKey='2230acaf43a388f0285a3b749f375c18b5e7dd79a17932fca12228141c58926b'
const iv = CryptoJS.enc.Utf8.parse('I8zyA4lVhMCaJ5Kg');
  // Convert the Uint8Array to a WordArray
 const decryptedData = CryptoJS.AES.decrypt(
  encryptedData,  
  // encryptedData.toString(), // Pass the ciphertext directly
  CryptoJS.enc.Utf8.parse(generatedKey),
  {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }
)
console.log("decryptrd dAta",decryptedData);

const decryptedUint8Array = new Uint8Array(decryptedData.sigBytes);

for (let i = 0; i < decryptedData.sigBytes; i++) {
  const wordIndex = i >>> 2;  // Calculate the word index
  const byteShift = (i % 4) * 8;  // Calculate the byte shift within the word

  // Ensure the word index is within bounds
  if (wordIndex >= 0 && wordIndex < decryptedData.words.length) {
    // Access the byte from the word and store it in the Uint8Array
    decryptedUint8Array[i] = (decryptedData.words[wordIndex] >>> (24 - byteShift)) & 0xff;
  } else {
    console.error("Error: Index out of bounds");
    break;  // Exit the loop if an error occurs
  }
}

console.log(decryptedUint8Array);

  return decryptedUint8Array;
}
  fetchCourseWork=async()=>{

    if(!this.state.contract1 && !this.state.contract2){
      return;
    }
    try{
      const userSubmissions = await this.state.contract.methods.getUserSubmissions().call({ from: this.state.account });
      console.log("User Submissions:", userSubmissions);
      const userCourse2=await this.state.contract1.methods.getRole(this.state.account).call();
      console.log(userCourse2)
      const userCourse=await this.state.contract1.methods.getUsercourse(this.state.account).call();
      console.log(userCourse)
      console.log(this.state.contract2)
      const userCoursework=await this.state.contract2.methods.getCourseworkList(userCourse).call();
      this.setState({userCoursework})
    }
catch (error) {
      console.error("Error fetching user submissions:", error);
    }
};
fetchurl=async(hash)=>{
    // Convert the async generator to an array
const ipfsHash = hash; // Assuming you have the IPFS hash
 const data=ipfs.cat(hash);
  // 'data' is the content retrieved from IPFS as a Uint8Array
  console.log("Data from IPFS:", data);
  console.log("this data",ipfsHashToEncryptedData[hash]);
        const decryptedData = this.decryptData(ipfsHashToEncryptedData[hash]);
      console.log("Decrypted Data:", decryptedData);
const blob = new Blob([decryptedData], { type: 'application/pdf' }); // Adjust the type as needed
const blobUrl = URL.createObjectURL(blob);
const downloadLink = document.createElement('a');
downloadLink.href = blobUrl;
downloadLink.download = 'filename.pdf'; // Specify the desired filename
downloadLink.click();

  // Convert Uint8Array back to WordArray

   // Fetch and decrypt each submission
//  const decryptedSubmissions = await Promise.all(
//   submissionHashes.map(async (submissionHash) => {
//     try {
//       const encryptedChunks = [];
//       for await (const chunk of ipfs.cat(submissionHash)) {
//        //  const content = chunk.toString();
//        // console.log("Chunk of content:", content);
//         encryptedChunks.push(chunk);
//       }

//       const encryptedData = new Uint8Array(encryptedChunks.reduce((acc, chunk) => [...acc, ...chunk], []));
//       // console.log("Encrypted Data:", encryptedData);


//     } catch (error) {
//       console.error("Error fetching or decrypting submission:", error);
//       return null;
//     }
//   })
// );

}

  fetchSubmissionDetails=async(ipfsHash)=>{

    if(!this.state.contract1 && !this.state.contract2){
      return;
    }
    try{
      const details=await this.state.contract.methods.subm(ipfsHash).call({from:this.state.account})
      console.log(details)
      const time=details[3];
   
                console.log('Timestamp:', time);
                const date = new Date(time * 1000);
                // details[3]=date;
                console.log(date);
        const d=this.fetchurl(details[0]);        
    
       this.setState({ selectedSubmissionDetails: details });
    }
catch (error) {
      console.error("Error fetching user submissions:", error);
    }
};
  handleOpenSubmissionPopup(courseworkId) {
    this.setState({
      selectedCoursework: courseworkId,
      popupOpen: true,
    });
  }

  handleCloseSubmissionPopup() {
    this.setState({
      selectedCoursework: null,
      popupOpen: false,
    });
  }
  renderSubmissionPopup(courseworkId) {
    return (
      <div className="submission-popup">
        <h3>Submit Coursework</h3>
         <form onSubmit={(event) => this.onSubmit(courseworkId, event)} >

               <input type='file' onChange={this.captureFile} />
               <input type='submit'/>
             </form>
        <button onClick={() => this.handleCloseSubmissionPopup()}>Cancel</button>
      </div>
    );
  
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
            <div>
        {/* Other navigation links */}
        <Logout />
      </div>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex  justify-content-center ">
              <div className="content mr-auto ml-auto">
              
             <h2>File Submission</h2>
            

              {this.state.result && (
          <div className="App">
        <h1>View Submissions</h1>
      
          <button type="button" className="btn btn-primary" onClick={this.fetchUserSubmissions}>
                  Fetch My Submissions
                </button>
           {this.state.userSubmissions !=null && (
                  <div>
                    <h3>My Submissions:</h3>
                   <ul>
  {this.state.userSubmissions.map((submissionHash, index) => (
    <li key={index}>
      <a
        href="#"
        onClick={() => this.fetchSubmissionDetails(submissionHash)}
      >
        {submissionHash}
      </a>
    </li>
  ))}
</ul>

                  </div>
                )}
                {this.state.selectedSubmissionDetails && (
  <div>
    <h3>Submission Details:</h3>
    <p>Course ID: {this.state.selectedSubmissionDetails[4]}</p>
    <p>Time: {new Date(this.state.selectedSubmissionDetails[3] * 1000).toLocaleString()}</p>
    <p>
      Link:{" "}
      <a
        href={this.state.url + this.state.selectedSubmissionDetails[0]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {this.state.selectedSubmissionDetails[0]}
      </a>
    </p>
  </div>
)}
      </div>

        )}
                <h1>View Coursework</h1>
   <button type="button" className="btn btn-primary" onClick={this.fetchCourseWork}>
          Fetch My Coursework
        </button>
        {this.state.userCoursework != null && (
          <div>
            <h3>My Coursework Submissions:</h3>
            <ul>
              {this.state.userCoursework.map((coursework, index) => (
                <li key={index}>
                  Coursework ID: {coursework.courseworkId}<br />
                  Coursework Name:{coursework.courseWorkName}<br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleOpenSubmissionPopup(coursework.courseworkId)}
                  >
                    Submit File
                  </button>
                  {this.state.popupOpen && this.state.selectedCoursework === coursework.courseworkId && (
                    this.renderSubmissionPopup(coursework.courseworkId)
                  )}
                </li>
              ))}
            </ul>
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
