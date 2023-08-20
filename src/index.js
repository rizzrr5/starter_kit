import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import Login from './components/Login';
import Admin from './components/Admin';
import Super from './components/Super';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

 const root = document.getElementById('root');

// createRoot(root).render(<Login/>);
// serviceWorker.unregister();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css'
// import App from './components/App';
// import Login from './components/Login';
// import * as serviceWorker from './serviceWorker';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';

// const root = document.getElementById('root');

// ReactDOM.render(
//   <BrowserRouter>
//     <Login/>
//   </BrowserRouter>,
//   document.getElementById('root')
// )
 // serviceWorker.unregister();

createRoot(root).render(
  <Router>
    <Routes>
     <Route path="/app" element={<App />} />
     <Route path="/admin" element={<Admin />} />
     <Route path="/super" element={<Super />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>,
  
);

serviceWorker.unregister();

