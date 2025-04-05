import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/ui/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // *Show A Loading Spinner While Authentication State Is Being Determined
  if (loading) {
    return <Loading />;
  }

  // *If The User Is Authenticated
  if (user) {
    return children;
  }

  // *Redirect To The Log-In Page If User Is Not Logged In
  return <Navigate to="/login" />;
};

export default PrivateRoute;
