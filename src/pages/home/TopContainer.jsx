import React from "react";
import BasicMap from "./BasicMap";



const TopContainer = () => {
  return (
    <div className="gradient4 relative flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 lg:p-12 bg-gradient-to-br shadow-lg ">
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 mt-10 mb-10">
        <h1 className=" font-bold leading-tight">
          Artisan village: le rendez-vous des créateurs passionnés et de
          l'artisanat d'exception
        </h1>
        <p className=" lg:text-x opacity-90">
          Bienvenue sur notre plateforme de localisation d'artisans créatifs !
          Ici, vous découvrirez des talents exceptionnels et des savoir-faire
          uniques. Notre site vous permet de trouver facilement des artisans
          passionnés près de chez vous, qu'ils soient bijoutiers, potiers,
          ébénistes ou couturiers. Chaque artisan dispose d'une vitrine dédiée
          pour présenter ses créations et son expertise. Parcourez nos
          catégories, découvrez des pièces uniques et soutenez l'artisanat
          local. Rejoignez-nous pour célébrer la créativité et le travail manuel
          d'artisans talentueux !
        </p>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
          <a
            href="/register"
            aria-label="Register to join Artisan village"
            className="button2 px-5 py-3 rounded-lg"
          >
            Nous rejoindre
          </a>
          <a
            href="/sheet"
            aria-label="View the list of artisans"
            className="button2 px-5 py-3  transition"
          >
            Liste des artisans
          </a>
        </div>
      </div>
      <div className=" w-full lg:w-1/2 flex justify-center items-center h-64 lg:h-96 relative rounded-lg overflow-hidden inset-0  mt-8 lg:mt-0">
        <BasicMap className=" w-full h-full opacity-70 hover:opacity-90 transition-all duration-500" />
      </div>
    </div>
  );

  
};


export default TopContainer;
