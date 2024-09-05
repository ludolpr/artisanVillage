import React from "react";
import BasicMap from "./BasicMap";

const TopContainer = () => {
  return (
    <div className="relative mt-10 mb-10 flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 lg:p-8 bg-[#d9b99b]">
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h1 className="font mb-4 text-6xl text-white">
          Artisan village le rendez-vous des créateurs passionnés et de
          l'artisanat d'exception
        </h1>
        <div>
          <p className="text-lg text-white">
            Bienvenue sur notre plateforme de localisation d'artisans créatifs !
            Ici, vous découvrirez des talents exceptionnels et des savoir-faire
            uniques. Notre site vous permet de trouver facilement des artisans
            passionnés près de chez vous, qu'ils soient bijoutiers, potiers,
            ébénistes ou couturiers. Chaque artisan dispose d'une vitrine dédiée
            pour présenter ses créations et son expertise. Parcourez nos
            catégories, découvrez des pièces uniques et soutenez l'artisanat
            local. Rejoignez-nous pour célébrer la créativité et le travail
            manuel d'artisans talentueux !
          </p>
        </div>
        <div className="flex justify-around mt-5 mb-10">
          <button className="bg-white text-[#d9b99b] p-5 rounded-lg">
            <a href="/register">Nous-rejoindre</a>
          </button>
          <button className="bg-white text-[#d9b99b] p-5 rounded-lg">
            Liste des artisans
          </button>
        </div>
      </div>

      <div className=" w-full lg:w-1/2 flex justify-center items-center h-64 lg:h-96">
        <div className="inset-0 mix-blend-overlay">
          <BasicMap className="overflow-hidden" />
        </div>
      </div>
    </div>
  );
};

export default TopContainer;
