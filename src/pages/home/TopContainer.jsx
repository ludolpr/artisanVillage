import React from "react";
import BasicMap from "./BasicMap";



const TopContainer = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 lg:p-12 bg-gradient-to-br from-[#d9b99b] to-[#b48a6f] shadow-lg rounded-lg">
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 mt-10 mb-10">
        <h1 className="text-3xl lg:text-6xl font-bold text-white leading-tight">
          Artisan village: le rendez-vous des créateurs passionnés et de
          l'artisanat d'exception
        </h1>
        <p className="text-lg lg:text-xl text-white opacity-90">
          Artisan village Bienvenue sur notre plateforme de localisation
          d'artisans créatifs ! Ici, vous découvrirez des talents exceptionnels
          et des savoir-faire uniques. Notre site vous permet de trouver
          facilement des artisans passionnés près de chez vous, qu'ils soient
          bijoutiers, potiers, ébénistes ou couturiers. Chaque artisan dispose
          d'une vitrine dédiée pour présenter ses créations et son expertise.
          Parcourez nos catégories, découvrez des pièces uniques et soutenez
          l'artisanat local. Rejoignez-nous pour célébrer la créativité et le
          travail manuel d'artisans talentueux ! Nous-rejoindre
        </p>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
          <a
            href="/register"
            className="bg-white text-[#d9b99b] px-5 py-3 rounded-lg hover:bg-[#b48a6f] hover:text-white transition"
          >
            Nous rejoindre
          </a>
          <a
            href="/sheet"
            className="bg-white text-[#d9b99b] px-5 py-3 rounded-lg hover:bg-[#b48a6f] hover:text-white transition"
          >
            Liste des artisans
          </a>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center h-64 lg:h-96 relative rounded-lg overflow-hidden inset-0 mix-blend-overlay mt-8 lg:mt-0">
        <BasicMap className="w-full h-full opacity-70 hover:opacity-90 transition-all duration-500" />
      </div>
    </div>
  );
};


export default TopContainer;
