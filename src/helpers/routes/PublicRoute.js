import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isAuthentication = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthentication && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default PublicRoute;
