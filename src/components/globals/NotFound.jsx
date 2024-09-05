// src/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#d9b99b]">
      <br />

      <h1 className="text-6xl font-bold text">404</h1>
      <br />

      <p className="text-xl text-gray-600 mt-4">
        Oups! La page que vous recherchez n'existe pas ou vous n'y avez pas
        accès.
      </p>
      <br />
      <Link to="/" className="mt-6 text-gray-800 hover:underline text-lg">
        Retour à la page principale
      </Link>
    </div>
  );
}

export default NotFound;
