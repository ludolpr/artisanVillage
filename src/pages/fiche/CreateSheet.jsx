import React, { useState } from "react";
import { api } from "../../services/baseUrl";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/globals/LoadingSpinner";
const CreateSheet = () => {
  const navigate = useNavigate(); // Utilisation de la navigation pour rediriger après la soumission réussie
  const [loading, setLoading] = useState(false); // État pour gérer le chargement

  // État pour gérer les données du formulaire, y compris les détails de l'entreprise et les coordonnées géographiques
  const [formData, setFormData] = useState({
    name_company: "",
    description_company: "",
    picture_company: null, // Image de l'entreprise
    zipcode: "",
    phone: "",
    address: "",
    siret: "",
    town: "",
    lat: "", // Latitude obtenue via Nominatim
    long: "", // Longitude obtenue via Nominatim
  });

  // Fonction pour gérer les changements dans les champs de texte et mettre à jour l'état formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Mise à jour de l'état pour le champ modifié
    });
  };

  // Fonction pour gérer le changement de fichier lors du téléchargement de l'image de l'entreprise
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      // On prend la dernière image sélectionnée si l'utilisateur en télécharge plusieurs
      picture_company: e.target.files[0],
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    setLoading(true); // Indique que le processus de soumission a commencé

    // Construction de l'adresse complète en utilisant les informations du formulaire
    const completeAddress = `${formData.address}, ${formData.zipcode}, ${formData.town}`;

    try {
      // Utilisation de Nominatim pour obtenir les coordonnées (latitude et longitude) à partir de l'adresse saisie
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${completeAddress}`
      );
      const data = await response.json();

      if (data.length > 0) {
        // Si l'adresse est trouvée, on met à jour la latitude et la longitude dans formData
        const updatedFormData = {
          ...formData,
          lat: data[0].lat,
          long: data[0].lon,
        };

        // Créer un objet FormData pour l'envoi des données au backend, utile pour gérer les fichiers
        const formDataToSend = new FormData();
        Object.keys(updatedFormData).forEach((key) => {
          formDataToSend.append(key, updatedFormData[key]);
        });

        // Envoi des données au backend Laravel via une requête POST à l'API
        await api.post("/company", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data", // Spécifie que les données envoyées sont de type form-data (incluant le fichier)
          },
        });

        // Après la soumission réussie, désactiver le chargement et rediriger vers la page d'accueil
        setLoading(false);
        navigate("/");

        alert("Fiche créée avec succès !"); // Notification à l'utilisateur
      } else {
        // Si l'adresse n'est pas trouvée, afficher un message d'erreur
        setLoading(false);
        alert("Impossible de trouver les coordonnées pour cette adresse.");
      }
    } catch (error) {
      // Gestion des erreurs lors de la soumission ou de l'appel API
      setLoading(false);
      console.error("Erreur lors de la soumission : ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="card1 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className=" font-bold text-center  mb-6">
          Créer une fiche entreprise
        </h2>
        {/* Formulaire pour la création de la fiche */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Champ pour le nom de l'entreprise */}
            <div>
              <label htmlFor="name_company" className="block  font-medium mb-2">
                Nom de l'entreprise
              </label>
              <input
                type="text"
                id="name_company"
                name="name_company"
                value={formData.name_company}
                onChange={handleChange} // Mise à jour des données du formulaire
                className="w-full p-3 border rounded-lg"
                placeholder="Entrez le nom de l'entreprise"
                required
              />
            </div>

            {/* Champ pour la description de l'entreprise */}
            <div className="col-span-2">
              <label
                htmlFor="description_company"
                className="block  font-medium mb-2"
              >
                Description de l'entreprise
              </label>
              <textarea
                id="description_company"
                name="description_company"
                value={formData.description_company}
                onChange={handleChange}
                className="w-full p-3 border  rounded-lg"
                placeholder="Décrivez l'entreprise"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Champ pour télécharger la photo de l'entreprise */}
            <div>
              <label
                htmlFor="picture_company"
                className="block   font-medium mb-2"
              >
                Photo de l'entreprise (de préférence une image au format
                paysage)
              </label>
              <input
                type="file"
                id="picture_company"
                name="picture_company"
                onChange={handleFileChange} // Gérer le téléchargement de l'image
                className="w-full p-3 border  rounded-lg"
                accept="image/*"
                required
              />
            </div>

            {/* Champ pour l'adresse */}
            <div className="col-span-2">
              <label htmlFor="address" className="block   font-medium mb-2">
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                placeholder="Entrez l'adresse"
                required
              />
            </div>

            {/* Champ pour le code postal */}
            <div>
              <label htmlFor="zipcode" className="block   font-medium mb-2">
                Code postal
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full p-3 border  rounded-lg"
                placeholder="Entrez le code postal"
                required
              />
            </div>

            {/* Champ pour la ville */}
            <div>
              <label htmlFor="town" className="block   font-medium mb-2">
                Ville
              </label>
              <input
                type="text"
                id="town"
                name="town"
                value={formData.town}
                onChange={handleChange}
                className="w-full p-3 border  rounded-lg"
                placeholder="Entrez la ville"
                required
              />
            </div>

            {/* Champ pour le téléphone */}
            <div>
              <label htmlFor="phone" className="block   font-medium mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3  rounded-lg"
                placeholder="Entrez le numéro de téléphone"
                required
              />
            </div>

            {/* Champ pour le numéro SIRET */}
            <div>
              <label htmlFor="siret" className="block   font-medium mb-2">
                N° de Siret
              </label>
              <input
                type="text"
                id="siret"
                name="siret"
                value={formData.siret}
                onChange={handleChange}
                className="w-full p-3 border  rounded-lg"
                placeholder="Entrez le numéro SIRET"
                required
              />
            </div>

            {/* Champs cachés pour la latitude et la longitude */}
            <div className="col-span-2 hidden">
              <input type="hidden" name="lat" value={formData.lat} />
              <input type="hidden" name="long" value={formData.long} />
            </div>
          </div>

          {/* Bouton de soumission avec gestion du chargement */}
          <button
            type="submit"
            className={`w-full ${
              loading ? <LoadingSpinner /> : "button3"
            } p-3 rounded-lg font-bold  transition duration-300`}
            disabled={loading} // Désactiver le bouton pendant le chargement
          >
            {loading ? "Création en cours..." : "Créer la fiche"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSheet;
