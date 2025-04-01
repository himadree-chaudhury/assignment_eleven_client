import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/ui/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a loading spinner while authentication state is being determined
  if (loading) {
    return <Loading/>;
  }

  // If the user is authenticated, render the protected content (children)
  if (user) {
    return children;
  }

  // Redirect To The Log-In Page If User Is Not Logged In & Return To The Current Page After Log-In
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
