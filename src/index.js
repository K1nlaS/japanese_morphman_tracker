//Misc
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//Components
import App from './App';
import { BrowserRouter } from "react-router-dom";

//Contexts
import { UserProvider } from "./contexts/user.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
