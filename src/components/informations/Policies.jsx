import React from "react";
import { NavLink } from "react-router-dom";

const policies = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Politique de Confidentialité</h1>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        Collecte des informations
      </h2>
      <p className="mb-4">
        Nous collectons des informations lorsque vous vous inscrivez sur notre
        site, vous vous connectez à votre compte, faites un achat, participez à
        un concours, et/ou lorsque vous vous déconnectez. Les informations
        recueillies incluent votre nom, votre adresse e-mail, votre numéro de
        téléphone et/ou votre carte de crédit.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        Utilisation des informations
      </h2>
      <p className="mb-4">
        Toute les informations que nous recueillons auprès de vous peuvent être
        utilisées pour :
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Personnaliser votre expérience et répondre à vos besoins individuels
        </li>
        <li>Fournir un contenu publicitaire personnalisé</li>
        <li>Améliorer notre site web</li>
        <li>Améliorer le service client et vos besoins de prise en charge</li>
        <li>Vous contacter par e-mail</li>
        <li>Administrer un concours, une promotion, ou une enquête</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        Confidentialité du commerce en ligne
      </h2>
      <p className="mb-4">
        Nous sommes les seuls propriétaires des informations recueillies sur ce
        site. Vos informations personnelles ne seront pas vendues, échangées,
        transférées, ou données à une autre société pour n’importe quelle
        raison, sans votre consentement, en dehors de ce qui est nécessaire pour
        répondre à une demande et/ou transaction, comme par exemple pour
        expédier une commande.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        Divulgation à des tiers
      </h2>
      <p className="mb-4">
        Nous ne vendons, n’échangeons et ne transférons pas vos informations
        personnelles identifiables à des tiers. Cela ne comprend pas les tierce
        parties de confiance qui nous aident à exploiter notre site Web ou à
        mener nos affaires, tant que ces parties conviennent de garder ces
        informations confidentielles.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        Protection des informations
      </h2>
      <p>
        Nous mettons en œuvre une variété de mesures de sécurité pour préserver
        la sécurité de vos informations personnelles. Nous utilisons un cryptage
        à la pointe de la technologie pour protéger les informations sensibles
        transmises en ligne. Nous protégeons également vos informations hors
        ligne. Seuls les employés qui ont besoin d’effectuer un travail
        spécifique (par exemple, la facturation ou le service à la clientèle)
        ont accès aux informations personnelles identifiables.
      </p>
      <NavLink
        to="/"
        className="text-primary hover:text-secondary mt-6 inline-block"
      >
        Retour à l'accueil
      </NavLink>
    </div>
  );
};
export default policies;
