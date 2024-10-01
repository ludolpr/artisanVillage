import React, { useState } from "react";

const UserForm = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState(
    user || { name: "", email: "", password: "", picture: null, role: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 ">
        Formulaire d'ajout d'utilisateur
      </h2>

      <div className=" mb-4">
        <label className="block  mb-2" htmlFor="name">
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border "
          required
        />
      </div>

      <div className="mb-4">
        <label className="block  mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border  rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="password">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border  rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block  mb-2" htmlFor="picture">
          Image de profil
        </label>
        <input
          type="file"
          id="picture"
          name="picture"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border  rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block  mb-2" htmlFor="role">
          Rôle de l'utilisateur
        </label>
        <select
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-2 border  rounded"
        >
          <option value="1">Utilisateur</option>
          <option value="2">Artisan</option>
          <option value="3">Administrateur</option>
        </select>
      </div>

      <button type="submit" className=" px-4 py-2 rounded">
        Créer utilisateur
      </button>
    </form>
  );
};

export default UserForm;
