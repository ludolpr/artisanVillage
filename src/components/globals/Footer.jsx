import React from "react";
import logoImage from "../../assets/images/logo.png";
const Footer = () => {
  return (
    // resoltion du probleme darkmode mettre les classe dans les :
    // <footer className="bg-[var(--background-color)] text-[var(--text-color)] py-10 px-6">
    <footer className=" flex secondary-500 text-[#d9b99b] p-5">
      <div className=" flex w-full justify-between ">
        <div className="flex row w-1/2 justify-around ">
          <div className=" col">
            <h6 className="text-2xl">liens rapides</h6>
            <ul>
              <li>
                <a href="">Acceuil</a>
              </li>
              <li>
                <a href="">A propos</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className=" col">
            <h6 className="flex row text-2xl">
              Mentions légales et politique de 
              <p className="font-bold"> Confidentialité</p>
            </h6>
            <p className="col ">
              <a href="/mentions">Mensions Légales</a>
              <br />
              <a href="/policy">Politique de confidentialité</a>
            </p>
          </div>
        </div>
        <div className="w-1/2 flex row justify-around">
          <hr className="verticalLine" />

          <a href="">
            <img className=" w-36 h-36" src={logoImage} alt="logo" />
          </a>

          <div className=" col">
            <h6 className="text-2xl">Services pour les artisans</h6>
            <ul>
              <li>
                <a href="">Crée votre fiche</a>
              </li>
              <li>
                <a href="">Chat avec utilisateurs</a>
              </li>
              <li>
                <a href="/contact">Support et assistance</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
