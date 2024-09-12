import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../hooks/UserContext";
import { api } from "../../services/baseUrl";

const ContactArtisan = (refreshKey) => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [adminEmail, setAdminEmail] = useState(process.env.MAIL_ADMIN);

  const { user: currentUser, isAuthenticated } = useContext(UserContext);

  // Fetch users with id_role == 2 (artisans) and filter them
  useEffect(() => {
    const fetchUsers = () => {
      api
        .get("/users")
        .then((response) => {
          const fetchedUsers = response.data;

          // Filter out artisans (id_role == 2)
          const artisans = fetchedUsers.filter((user) => user.id_role === 2);
          setUsers(artisans);
          setError("");
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des users", error);
          setError("Erreur lors de la récupération des utilisateurs.");
        });
    };

    fetchUsers();
  }, [refreshKey]);

  // État pour gérer le type de destinataire (administrateur ou artisan)
  const [recipientType, setRecipientType] = useState("admin");

  // Initialisation des données du formulaire
  const [formData, setFormData] = useState({
    name: isAuthenticated ? currentUser?.name_user || "" : "",
    email: isAuthenticated ? currentUser?.email || "" : "",
    recipientEmail: adminEmail,
    subject: "",
    message: "",
  });

  // Mise à jour de l'email du destinataire lorsque le type ou l'artisan change
  useEffect(() => {
    if (recipientType === "admin") {
      setFormData((prevData) => ({
        ...prevData,
        recipientEmail: adminEmail,
      }));
    }
  }, [recipientType, adminEmail]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecipientChange = (e) => {
    const selectedArtisanId = e.target.value;
    const selectedArtisan = users.find(
      (artisan) => artisan.id === parseInt(selectedArtisanId)
    );

    if (selectedArtisan) {
      setFormData({
        ...formData,
        recipientEmail: selectedArtisan.email,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled in, even for non-authenticated users
    if (!formData.name || !formData.email) {
      alert("Veuillez remplir votre nom et votre email.");
      return;
    }

    try {
      await fetch("http://localhost:8000/api/mettreicicliendecontact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("Votre message a été envoyé avec succès!");

      setFormData({
        ...formData,
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Une erreur est survenue lors de l'envoi de votre message.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-[#9a7d6b] mb-6">
          {recipientType === "admin"
            ? "Contacter l'administrateur"
            : "Contacter un artisan"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Choisissez le destinataire
            </label>
            <select
              name="recipientType"
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#9a7d6b]"
            >
              <option value="admin">Contacter l'administrateur</option>
              <option value="artisan">Contacter un artisan</option>
            </select>
          </div>

          {recipientType === "artisan" && (
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Sélectionnez l'artisan
              </label>
              <select
                name="artisan"
                onChange={handleRecipientChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#9a7d6b]"
              >
                <option value="">-- Choisir un artisan --</option>
                {users.map((artisan) => (
                  <option key={artisan.id} value={artisan.id}>
                    {artisan.name_user} ({artisan.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Votre nom
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Votre email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Sujet
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#9a7d6b]"
              placeholder="Sujet du message"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#9a7d6b]"
              placeholder="Votre message"
              rows="6"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#9a7d6b] text-white font-bold rounded-lg hover:bg-[#7f6957] transition-colors"
          >
            Envoyer le message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactArtisan;
