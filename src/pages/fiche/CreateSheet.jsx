import React, { useState } from "react";
import { api } from "../../services/baseUrl";
import { useNavigate } from "react-router-dom";

const CreateSheet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // État pour gérer les données du formulaire, y compris les détails de l'entreprise et les coordonnées géographiques
  const [formData, setFormData] = useState({
    name_company: "",
    description_company: "",
    picture_company: null,
    zipcode: "",
    phone: "",
    address: "",
    siret: "",
    town: "",
    lat: "",
    long: "",
  });

  // Fonction pour gérer les changements dans les champs de texte et mettre à jour l'état formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction pour gérer le changement de fichier lors du téléchargement de l'image de l'entreprise
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      // take the last picture if you try to send more
      picture_company: e.target.files[0],
    });
  };

  // function for submit form
  const handleSubmit = async (e) => {
    // stop sending default form
    e.preventDefault();
    setLoading(true);
    // construct full address
    const completeAddress = `${formData.address}, ${formData.zipcode}, ${formData.town}`;

    try {
      // catch data lat and long with the address of the input
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${completeAddress}`
      );
      const data = await response.json();

      if (data.length > 0) {
        // if the address was found, updating lat and long in formdata
        const updatedFormData = {
          ...formData,
          lat: data[0].lat,
          long: data[0].lon,
        };

        // Créer un objet FormData pour l'envoi des données au backend
        const formDataToSend = new FormData();
        Object.keys(updatedFormData).forEach((key) => {
          formDataToSend.append(key, updatedFormData[key]);
        });

        // Envoyer les données au backend Laravel via l'API
        await api.post("/company", formDataToSend, {
          headers: {
            // Spécifie que les données envoyées sont multipart/form-data
            "Content-Type": "multipart/form-data",
          },
        });
        setLoading(false);
        navigate("/");

        alert("Fiche créée avec succès !");
      } else {
        setLoading(false);
        alert("Impossible de trouver les coordonnées pour cette adresse.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Erreur lors de la soumission : ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-[#9a7d6b] mb-6">
          Créer une fiche entreprise
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name_company"
                className="block text-[#9a7d6b] text-lg font-medium mb-2"
              >
                Nom de l'entreprise
              </label>
              <input
                type="text"
                id="name_company"
                name="name_company"
                value={formData.name_company}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Entrez le nom de l'entreprise"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="description_company"
                className="block text-[#9a7d6b] text-lg font-medium mb-2"
              >
                Description de l'entreprise
              </label>
              <textarea
                id="description_company"
                name="description_company"
                value={formData.description_company}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Décrivez l'entreprise"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="picture_company"
                className="block text-[#9a7d6b] text-lg font-medium mb-2"
              >
                Photo de l'entreprise
              </label>
              <input
                type="file"
                id="picture_company"
                name="picture_company"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="address"
                className="block text-[#9a7d6b] text-lg font-medium mb-2"
              >
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Entrez l'adresse"
                required
              />
            </div>

            <div>
              <label
                htmlFor="zipcode"
                className="block text-[#9a7d6b] text-lg font-medium mb-2"
              >
                Code postal
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Entrez le code postal"
                required
              />
            </div>

            <div>
              <label
                htmlFor="town"
                className="block text-[#9a7d6b] text-lg font-medium mb-2"
              >
                Ville
              </label>
              <input
                type="text"
                id="town"
                name="town"
                value={formData.town}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Entrez la ville"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-[#9a7d6b] text-lg font-medium mb-2"
              >
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Entrez le numéro de téléphone"
                required
              />
            </div>

            <div>
              <label
                htmlFor="siret"
                className="block text-[#9a7d6b] text-lg font-medium mb-2"
              >
                N° de Siret
              </label>
              <input
                type="text"
                id="siret"
                name="siret"
                value={formData.siret}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Entrez le numéro SIRET"
                required
              />
            </div>

            <div className="col-span-2">
              <input type="hidden" id="lat" name="lat" value={formData.lat} />
              <input
                type="hidden"
                id="long"
                name="long"
                value={formData.long}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#9a7d6b] text-white p-3 rounded-lg font-bold hover:bg-[#816556] transition duration-300"
          >
            Créer la fiche
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSheet;
