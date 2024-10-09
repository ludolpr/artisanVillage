import React from "react";
import { NavLink } from "react-router-dom";

const MentionsLegales = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className=" font-bold mb-4">Mentions Légales</h1>
      <p className="mb-4">
        <strong>Nom de l’entreprise :</strong> Artisan Village
      </p>
      <p className="mb-4">
        <strong>Adresse :</strong> Sarthe, France, Département 72
      </p>
      <p className="mb-4">
        <strong>Téléphone :</strong> 06-66-66-66-66
      </p>
      <p className="mb-4">
        <strong>Email :</strong> mail@gmail.com
      </p>
      <p className="mb-4">
        <strong>Directeur de la publication :</strong> ludolpr
      </p>
      <p className="mb-4">
        <strong>Hébergeur :</strong> OVH Cloud
      </p>

      <h2 className=" font-semibold mt-6 mb-4">Propriété intellectuelle</h2>
      <p className="mb-4">
        Tout le contenu du site Artisan Village, incluant, de façon non
        limitative, les graphismes, images, textes, vidéos, animations, sons,
        logos, gifs et icônes ainsi que leur mise en forme sont la propriété
        exclusive de la société Artisan Village, à l’exception des marques,
        logos ou contenus appartenant à d’autres sociétés partenaires ou
        auteurs.
      </p>

      <h2 className=" font-semibold mt-6 mb-4">Conditions d’utilisation</h2>
      <p className="mb-4">
        L’utilisation de ce site implique l’acceptation pleine et entière des
        conditions générales d’utilisation décrites ci-après. Ces conditions
        d’utilisation sont susceptibles d’être modifiées ou complétées à tout
        moment.
      </p>

      <NavLink to="/" className=" mt-6 inline-block">
        Retour à l'accueil
      </NavLink>
    </div>
  );
  
};

export default MentionsLegales;
