import React from 'react';
import ReactDOM from 'react-dom/client';
//* IMPORT DU STYLE
import "./styles/app.scss";
import "./style.scss"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
//* IMPORT DE APP
import {App} from './App';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </React.StrictMode>
);
