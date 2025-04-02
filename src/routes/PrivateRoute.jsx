import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // *If the user is authenticated, render the protected content (children)
  if (user) {
    return children;
  }

  // *Redirect To The Log-In Page If User Is Not Logged In & Return To The Current Page After Log-In
  return <Navigate to="/login" />;
};

export default PrivateRoute;
