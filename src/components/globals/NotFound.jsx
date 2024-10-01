// src/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-xl mt-4">
        Oups! La page que vous recherchez n'existe pas ou vous n'y avez pas
        accès.
      </p>

      <Link to="/" className="mt-6 hover:underline text-lg">
        Retour à la page principale
      </Link>
    </div>
  );
  
}

export default NotFound;
