import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    switch (status) {
      case "success":
        setMessage(
          "Votre email a été vérifié avec succès. Vous pouvez fermer cette page."
        );
        setStatusType("success");
        break;
      case "created":
        setMessage("Votre fiche à bien été creer");
        setStatusType("success");
        break;
      case "already_verified":
        setMessage("Votre email est déjà vérifié.");
        setStatusType("info");
        break;
      case "user_not_found":
        setMessage("Utilisateur introuvable.");
        setStatusType("error");
        break;
      case "invalid_link":
        setMessage("Lien invalide ou expiré.");
        setStatusType("error");
        break;
      default:
        setMessage("Une erreur est survenue.");
        setStatusType("error");
        break;
    }
  }, [location.search]);

  return (
    <div className="flex items-center justify-center min-h-screen gradient3 ">
      <div className="card1 p-6  rounded-lg shadow-lg max-w-md text-center">
        <h2
          className={` mb-4 ${
            statusType === "success"
              ? "added"
              : statusType === "info"
              ? "text-blue-600"
              : "refuse"
          }`}
        >
          {statusType === "success" && "✔️"}
          {statusType === "info" && "ℹ️"}
          {statusType === "error" && "❌"}
        </h2>
        <p className="">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;