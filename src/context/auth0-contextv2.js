
import React, {createContext} from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';


// create the context
export const Auth0Context = createContext();

export const  Auth0Provider = (props) => {
    
    const [auth0Client, setAuth0Client] = React.useState(null);
    const [isLoading, setIsLoadind] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin
    };

    React.useEffect(()=>{
        initializeAuth0();
    },[])

     // initialize the auth0 library
     const initializeAuth0 = async () => {
        const auth0Clientfx = await createAuth0Client(config);
        setAuth0Client({ auth0Clientfx });
    
        // check to see if they have been redirected after login
        if (window.location.search.includes('code=')) {
          return handleRedirectCallback();
        }
    
        const estaAutenticado = await auth0Clientfx.isAuthenticated();
        const usuario = estaAutenticado ? await auth0Clientfx.getUser() : null;
        setIsLoadind(false);
        setIsAuthenticated(estaAutenticado);
        setUser(usuario);
      };

      const handleRedirectCallback = async () => {
        setIsLoadind(true);

        await auth0Client.handleRedirectCallback();
        const user = await auth0Client.getUser();
        setUser(user);
        setIsAuthenticated(true);
        setIsLoadind(false)
        window.history.replaceState({}, document.title, window.location.pathname);
    };


    const { children } = props;

    const configObject = {
        isLoading,
        isAuthenticated,
        user,
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        logout: (...p) => auth0Client.logout(...p)
    };


    return ( 
        <Auth0Context.Provider value={configObject}>
            {children}
        </Auth0Context.Provider>
     );
}
 
