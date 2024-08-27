import React from "react";

const Footer = () => {
  return (
    <footer className="secondary-500 text-white">
      <div className=" flex w-full justify-between">
        <div className="flex row w-2/3 justify-around">
          <div className="  col">
            <h6>liens rapides</h6>
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
            <h6>
              Mentions légales et politique de{" "}
              <p className="font-bold">Confidentialité</p>
            </h6>
            <p>
              <a href="">Mensions Légales</a>
              <a href="">Politique de confidentialité</a>
            </p>
          </div>
        </div>
        <div className="w-1/3">
          <div></div>
          <div></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
