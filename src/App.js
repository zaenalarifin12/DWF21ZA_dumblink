import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import "./assets/scss/style.scss";
import Template from "./pages/TemplatePage";
import AddLink from "./pages/AddLinkPage";
import PreviewLink from "./pages/PreviewLinkPage";
import MyLinkPage from "./pages/MyLinkPage";
import MyAccount from "./pages/MyAccount";
import { ModalAuthContextProvider } from "./context/ModalAuthContext";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { API, setAuthToken } from "./config/api";
import { AUTH_ERROR, LOGIN } from "./config/Constants";
import PrivateRoute from "./PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [stateAuth, dispatchAuth] = useContext(AuthContext);

  const checkAuth = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);

      if (response.status === 401) {
        dispatchAuth({ type: AUTH_ERROR });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatchAuth({
        type: LOGIN,
        payload: payload,
      });
    } catch (error) {
      return dispatchAuth({
        type: AUTH_ERROR,
      });
    }
  };

  const client = new QueryClient();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <ModalAuthContextProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={LandingPage} />

              <PrivateRoute path="/template" component={Template} />
              <PrivateRoute path="/add-link" component={AddLink} />
              <PrivateRoute path="/my-link" component={MyLinkPage} />
              <PrivateRoute path="/my-account" component={MyAccount} />
              <Route path="/link/:id" component={PreviewLink} />
            </Switch>
          </Router>
        </ModalAuthContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
