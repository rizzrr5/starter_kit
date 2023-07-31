import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      buffer:null
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
  onSubmit=(event)=>{
    event.preventDefault()
    console.log('submit form.')
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
              
               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
