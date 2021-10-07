import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
  const [loginUser, setloginUser] = useContext(UserContext);
  useEffect(() => {
    const stickyValue = window.localStorage.getItem("auth");
    const authValue = stickyValue !== null ? JSON.parse(stickyValue) : "";
    if (window.localStorage.getItem("auth") !== null) {
      setloginUser(authValue);
    }
  }, []);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loginUser.emailVerified ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
