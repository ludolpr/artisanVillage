import React from "react";
import artisan1 from "../../assets/images/worker1.jpg";
import artisan2 from "../../assets/images/worker2.jpg";
import artisan4 from "../../assets/images/worker4.jpg";
const MidContainer = () => {
  return (
    <div className="imgMidContainer">
      <div className="absolute inset-0 bg-black opacity-0"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full p-4 lg:p-8">
        <h2 className="text-white text-2xl lg:text-4xl  text-center py-4 lg:py-8 bg-[#d9b99b] p-4 rounded-lg">
          Découvrez les talents locaux trouvez l'artisan créatif près de chez
          vous.
        </h2>

        <div className="relative z-10 flex flex-col lg:flex-row justify-around p-4 lg:p-8 gap-4 mt-4 lg:mt-8 items-end">
          <div className="bg-[#9a7d6b] shadow-lg flex flex-col w-full lg:w-1/2 h-auto lg:h-[500px]">
            <div className="flex flex-col h-full">
              <div className="p-4   pr-5 pl-5 ">
                <h3 className="bg-white text-[#9a7d6b] text-2xl  mb-4 p-2 rounded-lg w-1/3">
                  Nom de la fiche 1
                </h3>
                <p className="bg-white text-[#9a7d6b] text-lg mb-4 p-2 rounded-lg">
                  Description de la fiche 1. Ce texte peut être long ou court
                  selon les informations à présenter.
                </p>
                <img
                  src={artisan2}
                  alt="Fiche 1"
                  className="w-full h-[300px] object-cover mt-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#d9b99b] shadow-lg flex flex-col lg:flex-row w-full lg:w-1/2 h-auto lg:h-[300px] ">
            <div className="flex-1 p-4 ">
              <h3 className="text-white text-2xl  mb-4">Nom de la fiche 2</h3>
              <p className="text-white text-lg mb-4">
                Description de la fiche 2. Ce texte peut être long ou court
                selon les informations à présenter.
              </p>
            </div>

            <img
              src={artisan4}
              alt="Fiche 2"
              className="w-full lg:w-1/2 h-auto object-cover rounded-lg m-7"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidContainer;
