import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<App />);
serviceWorker.unregister();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css'
// import App from './components/App';
// import Login from './components/Login';
// import * as serviceWorker from './serviceWorker';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';

// const root = document.getElementById('root');

// createRoot(root).render(
//   <Router>
//     <Login />
//   </Router>
// );

// serviceWorker.unregister();

