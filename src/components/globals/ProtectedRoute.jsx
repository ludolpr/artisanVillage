import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

const ProtectedRoute = ({ element: Component, roleRequired }) => {
  const { user } = useContext(UserContext);

  // console.log("Required role:", roleRequired);
  // console.log("User role:", user?.id_role);

  // Vérifiez si l'utilisateur est authentifié et possède le rôle requis
  if (user && user.id_role === roleRequired) {
    // Si l'utilisateur a le rôle requis, rendre le composant protégé
    return Component;
  } else {
    // Sinon, rediriger vers la page d'accueil
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
