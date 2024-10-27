import React from "react";
import logo from "../../assets/images/logo.png";
const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 py-12">
        <div className="relative gradient3 rounded-lg shadow-lg p-12 space-y-8 text-center">
          <div className="space-y-6">
            <h2 className="font-extrabold leading-snug  ">
              Bienvenue sur Artisan Village
            </h2>
            <p>
              Artisan Village est le rendez-vous des créateurs passionnés. Notre
              plateforme offre une visibilité unique aux artisans en leur
              permettant de présenter leurs talents, de partager leurs créations
              et d’échanger avec des clients et partenaires locaux. Que vous
              soyez un maître dans l’art de la poterie, un bijoutier talentueux
              ou un fabricant de meubles innovant, Artisan Village est là pour
              vous aider à briller.
            </p>
            <h3>Notre Mission</h3>
            <p>
              Nous croyons fermement que chaque artisan mérite d’avoir
              l’opportunité de montrer son savoir-faire et de se connecter avec
              une clientèle passionnée. Notre mission est de fournir aux
              artisans les outils nécessaires pour développer leur activité en
              ligne, tout en favorisant les échanges et le commerce local. En
              rejoignant Artisan Village, vous devenez une partie d’une
              communauté dédiée à la promotion de l’artisanat.
            </p>
            <h3>Comment ça Marche ?</h3>
            <p>
              Inscrivez-vous gratuitement sur notre plateforme et créez votre
              profil en quelques étapes simples. Vous pourrez ensuite :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-left mx-auto max-w-md ">
              <li>
                Ajouter des informations détaillées sur vos services et vos
                créations.
              </li>
              <li>
                Partager des photos de vos œuvres, leur prix pour attirer de
                nouveaux clients.
              </li>
            </ul>
            <h3 className="font-bold">Avantages pour les Artisans</h3>
            <p>
              En tant que membre d’Artisan Village, vous bénéficiez de nombreux
              avantages :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-left mx-auto max-w-md">
              <li>Visibilité accrue pour vos créations.</li>
              <li>Présentation de vos produits</li>
              <li>
                Possibilité d'être contacté par mail et présence en ligne.
              </li>
              <li>
                Géolocalisation de votre boutique pour favoriser le commerce
                local
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Artisan créateur"
              className="w-full h-auto rounded-lg  object-cover max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
