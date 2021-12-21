import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthentication = localStorage.getItem("token");
  let isAdmin = localStorage.getItem("persist:root");
  if (isAdmin) {
    isAdmin = JSON.parse(isAdmin).auth;
    isAdmin = JSON.parse(isAdmin).userLogin.role;
    isAdmin = isAdmin == "admin" ? true : false;
  } else {
    isAdmin = false;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthentication && isAdmin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export default PrivateRoute;
