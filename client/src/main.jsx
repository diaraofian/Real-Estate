import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-plmbu63trvbzf5av.us.auth0.com"
      clientId="bZ8kMMsVEiM3bzg2HAMb7X2HOHWAX42U"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
      }}
      //first one for client side , and port is from server side
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
