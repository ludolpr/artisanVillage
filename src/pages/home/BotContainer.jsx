import React, { useEffect, useState, useContext } from "react";

import { NavLink } from "react-router-dom";
import { api } from "../../services/baseUrl";
import { UserContext } from "../../hooks/UserContext";

import artisan3 from "../../assets/images/worker3.jpg";

const BotContainer = () => {
  const [hasFiche, setHasFiche] = useState(false);
  const [ficheId, setFicheId] = useState(null);
  const { user, isAuthenticated, role } = useContext(UserContext);

  useEffect(() => {
    const fetchUserFiche = () => {
      if (isAuthenticated && user && user.id) {
        api
          .get("/company") // Adjust endpoint as needed
          .then((response) => {
            const companies = response.data;

            // Find the fiche that matches the current user
            const userFiche = companies.find(
              (company) => company.id_user === user.id
            );

            if (userFiche) {
              setFicheId(userFiche.id); // Assuming the fiche ID is in 'id' field
              setHasFiche(true);
            } else {
              setHasFiche(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching company data:", error);
            setHasFiche(false);
          });
      }
    };

    fetchUserFiche();
  }, [isAuthenticated, user]);
  return (
    <div className="relative gradient1 flex flex-col lg:flex-row items-center justify-between py-12 px-6 lg:px-16 space-y-8 lg:space-y-0">
      <div className="lg:w-1/2 space-y-6">
        {role <= 1 ? (
          <>
            <h2 className=" font-extrabold leading-snug">
              Déposez votre fiche et faites briller votre talent !
            </h2>
            <p>
              Vous êtes artisan créatif ? Rejoignez notre communauté et déposez
              votre fiche dès aujourd'hui ! En créant votre profil, vous pouvez
              présenter votre savoir-faire, partager des photos de vos
              créations, et détailler vos services. Attirez de nouveaux clients
              passionnés par l'artisanat et développez votre activité en ligne.
              Inscrivez-vous gratuitement et faites connaître votre talent au
              monde entier !
            </p>
            {role == 1 && (
              <NavLink
                to="/creerfiche"
                className="inline-block   px-6 py-3 rounded-lg shadow-md button2 "
              >
                Créer une nouvelle fiche
              </NavLink>
            )}
          </>
        ) : (
          <>
            <h2 className=" lg:text-5xl font-extrabold leading-snug">
              Améliorez votre fiche d'entreprise
            </h2>
            <p className=" lg: mr-5">
              Votre fiche d'entreprise est essentielle pour attirer de nouveaux
              clients et partenaires. Ajoutez des informations détaillées sur
              vos services, partagez vos réussites et montrez ce qui vous
              distingue. Votre fiche bien renseignée permet de mettre en valeur
              votre expertise et d'établir une confiance avec vos futurs
              clients.
            </p>
            {role <= 2 && (
              <NavLink
                to={`/showsheet/${ficheId}`}
                className="inline-block px-6 py-3 rounded-lg shadow-md button2"
              >
                Voir ma fiche artisan
              </NavLink>
            )}
          </>
        )}
      </div>
      <div className="lg:w-1/2">
        <img
          src={artisan3}
          alt="Artisan créateur"
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>
    </div>
  );
};

export default BotContainer;
