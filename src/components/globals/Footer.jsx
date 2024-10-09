import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logoImage from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="p-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row w-full md:w-1/2 justify-between mb-5 md:mb-0">
          <div className="flex flex-col items-center md:items-start mb-5 md:mb-0">
            <h6 className="font-bold mb-2">Liens rapides :</h6>
            <ul className="text-center md:text-left">
              <li className="mb-2">
                <a href="/" className="hover:underline">
                  Accueil
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:underline">
                  À propos
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h6 className="font-bold mb-2">
              Mentions légales et Politique de Confidentialité :
            </h6>
            <ul className="text-center md:text-left">
              <li className="mb-2">
                <a href="/mentions" className="hover:underline">
                  Mentions Légales
                </a>
              </li>
              <li className="mb-2">
                <a href="/policy" className="hover:underline">
                  Politique de confidentialité
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="http://localhost:8000/api/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation de mon application
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row items-center md:w-1/2">
          <a href="/" className="mb-5 md:mb-0">
            <img className="w-36 h-36" src={logoImage} alt="logo" />
          </a>
          <div className="flex flex-col items-center md:items-start">
            <h6 className="font-bold mb-2">Services pour les artisans :</h6>
            <ul className="text-center md:text-left">
              <li className="mb-2">
                <a href="/create" className="hover:underline">
                  Créez votre fiche
                </a>
              </li>
              <li className="mb-2">
                <a href="" className="hover:underline">
                  Chat avec utilisateurs
                </a>
              </li>
              <li className="mb-2">
                <a href="" className="hover:underline">
                  Support et assistance
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center space-x-4">
        <a href="https://facebook.com">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com">
          <FaInstagram size={24} />
        </a>
      </div>
      <div className="mt-5 text-center">
        <p>© 2024 Ludolpr Entreprise. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
