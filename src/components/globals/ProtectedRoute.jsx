import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

const ProtectedRoute = ({ element: Component, roleRequired }) => {
  const { user } = useContext(UserContext);

  // console.log("Required role:", roleRequired);
  // console.log("User role:", user?.id_role);

  // Check if the user is authenticated and has the required role
  if (user && user.id_role === roleRequired) {
    // If the user has the required role, make the component protected
    return Component;
  } else {
    // Otherwise, redirect to the home page
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
