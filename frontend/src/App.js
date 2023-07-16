import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { AppContext } from "./lib/contextLib";
import { onError } from "./lib/errorLib";
import { useNavigate } from "react-router-dom";
import { TopNavbar } from './containers/navbar/TopNavbar'
import Routes from "./Routes";
import "./App.css";

function App() {
  const nav = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <div className="app-container">

        <div className="nav-container">
          <TopNavbar isAuthenticated={isAuthenticated} userHasAuthenticated={userHasAuthenticated} />
        </div>

        <div className="main-content-container">
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Routes />
          </AppContext.Provider>
        </div>

      </div>
    )
  );
}

export default App;