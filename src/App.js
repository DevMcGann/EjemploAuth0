import React, {useContext} from 'react';
import './App.css';
import {Auth0Context}  from './context/auth0-context';

function App() {
  
  const { isLoading, user, loginWithRedirect, logout } = useContext(Auth0Context);

  return (
    <div className="App">
      <h1>Asd</h1>
      {!isLoading && !user && (
            <>
              <h1>Click Below!</h1>
              <button onClick={loginWithRedirect} className="button is-danger">
                Login
              </button>
            </>
          )}
          {/* this is the new section */}
          {!isLoading && user && (
            <>
              <h1>You are logged in!</h1>
              <p>Hello {user.name}</p>

              {user.picture && <img src={user.picture} alt="My Avatar" />}
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="button is-small is-dark"
              >
                Logout
          </button>
            </>
          )}
    </div>
  );
}

export default App;
