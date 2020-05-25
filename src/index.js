import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Auth0Provider}  from './context/auth0-context';

ReactDOM.render(
  <Auth0Provider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
