import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let isAuthentication = localStorage.getItem("login");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthentication ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
