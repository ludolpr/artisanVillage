import React from "react";
import { NavLink } from "react-router-dom";
import artisan3 from "../../assets/images/worker3.jpg";

const BotContainer = () => {
  return (
    <div className="text-white flex flex-col lg:flex-row items-center justify-between p-4 lg:p-8 bg-[#d9b99b]">
      {/* Left Section with Title, Description, and Link */}
      <div className="lg:w-1/2 w-full p-4">
        <h2 className="text-3xl mb-4 text-7xl">
          Déposez votre fiche et faites briller votre talent !
        </h2>
        <p className="text-lg text-white mb-4">
          Vous êtes artisan créatif ? Rejoignez notre communauté et déposez
          votre fiche dès aujourd'hui ! En créant votre profil, vous pouvez
          présenter votre savoir-faire, partager des photos de vos créations, et
          détailler vos services. Attirez de nouveaux clients passionnés par
          l'artisanat et développez votre activité en ligne. Inscrivez-vous
          gratuitement et faites connaître votre talent au monde entier !
        </p>
        <div className="flex justify-center">
          <NavLink
            to=""
            className="flex bg-white text-[#d9b99b] p-5 rounded-lg justify-center w-1/2 align"
          >
            Créer une nouvelle fiche
          </NavLink>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="lg:w-1/2 w-full p-4">
        <img
          src={artisan3}
          alt="Artisan créateur"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default BotContainer;
