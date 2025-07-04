import React from "react";
import { Auth0Provider } from '@auth0/auth0-react';

import { BrowserRouter } from "react-router-dom";

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <Auth0Provider
    domain="dev-hr1xhzh1ny2q0mcb.us.auth0.com"
    clientId="AaZGZNFIJXVIYRRzevXH5XdxoR5Txgfv"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
  <App />
  </BrowserRouter>
  </Auth0Provider>

 
)
