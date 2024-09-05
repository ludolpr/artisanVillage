import React, { useState, useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

const ContactArtisan = () => {
  const { user: currentUser, isAuthenticated } = useContext(UserContext);

  // Initialisation des données du formulaire en dehors de toute condition
  const [formData, setFormData] = useState({
    name: isAuthenticated ? currentUser?.name_user || "" : "",
    email: isAuthenticated ? currentUser?.email || "" : "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remplacez cette URL par l'URL de votre API pour envoyer les messages
      await fetch("http://localhost:8000/api/contact-artisan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      });

      alert("Votre message a été envoyé avec succès!");

      // Réinitialiser le formulaire après envoi
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

  if (!isAuthenticated) {
    return (
      <p className="text-white text-center mt-10">
        Veuillez vous connecter pour accéder à cette fonctionnalité.
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-[#9a7d6b] mb-6">
          Contactez l'artisan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Votre nom
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
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
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
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
