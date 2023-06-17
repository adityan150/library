import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";

import Home from "./components/home/Home";
import { SearchContextProvider } from "./context/SearchContext";

function App() {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <SearchContextProvider>
        <Home />
      </SearchContextProvider>
    </Auth0Provider>
  );
}

export default App;
