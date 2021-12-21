import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";

import { Provider } from "react-redux";
import { store, persistor } from "./stores/store";
import { PersistGate } from "redux-persist/integration/react";

import PublicRoute from "./helpers/routes/PublicRoute";
import PrivateRoute from "./helpers/routes/PrivateRoute";

function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <PublicRoute path="/auth/login" exact component={Login} />
          <PublicRoute path="/auth/register" exact component={Register} />
          <PublicRoute path="/" exact component={Home} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
