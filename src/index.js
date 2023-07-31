import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
//hello
//asdas
// Import createRoot from "react-dom/client" instead of directly from "react-dom"

// Use createRoot to render the App component
createRoot(root).render(<App />);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
