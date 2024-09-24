import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../hooks/UserContext";
import { api } from "../../services/baseUrl";
import { useNavigate } from "react-router-dom";

const ContactArtisan = () => {
  const { user: currentUser, isAuthenticated } = useContext(UserContext);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [recipientType, setRecipientType] = useState("artisan");
  const navigate = useNavigate();
  const adminEmail = process.env.REACT_APP_MAIL_ADMIN;
  const [name, setName] = useState(
    isAuthenticated ? currentUser?.name_user || "" : ""
  );
  const [email, setEmail] = useState(
    isAuthenticated ? currentUser?.email || "" : ""
  );
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Fetch artisans when component loads
  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      const response = await api.get("/users");
      const artisans = response.data.filter((user) => user.id_role === 2);
      setUsers(artisans);
    } catch (error) {
      setError("Erreur lors de la récupération des artisans");
    }
  };

  const handleRecipientChange = (e) => {
    const selectedArtisanId = e.target.value;
    const selectedArtisan = users.find(
      (artisan) => artisan.id === parseInt(selectedArtisanId)
    );

    if (selectedArtisan) {
      setRecipientEmail(selectedArtisan.email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si le type de destinataire est "admin", on force recipientEmail à adminEmail
    if (recipientType === "admin") {
      setRecipientEmail(adminEmail); // Assigner l'email admin ici
    }
    // Vérifier si tous les champs sont remplis (sauf recipientEmail pour admin)
    if (
      !name ||
      !email ||
      !subject ||
      !message ||
      (recipientType === "artisan" && !recipientEmail)
    ) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    // Limiter le contact avec l'admin uniquement si l'utilisateur est authentifié
    if (recipientType === "admin" && !isAuthenticated) {
      alert("Vous devez être connecté pour contacter l'administrateur.");
      return;
    }

    // determinate finaly mail address : if admin, used adminEmail
    const finalRecipientEmail =
      recipientType === "admin" ? adminEmail : recipientEmail;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("recipientEmail", finalRecipientEmail); // use finaly mail address here
    formData.append("recipientType", recipientType);

    try {
      const response = await api.post("/contact", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Votre message a été envoyé avec succès !");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'envoi de votre message.");
    }
    navigate(-1);
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
          {/* Recipient Selection */}
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
              <option value="artisan">Contacter un artisan</option>
              <option value="admin" disabled={!isAuthenticated}>
                Contacter l'administrateur{" "}
                {isAuthenticated ? "" : "(connexion requise)"}
              </option>
            </select>
          </div>

          {/* Artisan Selection (only if contacting an artisan) */}
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

          {/* Name Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Votre nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez votre nom"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Votre email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Sujet
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#9a7d6b]"
              placeholder="Sujet du message"
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#9a7d6b]"
              placeholder="Votre message"
              rows="6"
            ></textarea>
          </div>
          {/* btn for send this form */}
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

