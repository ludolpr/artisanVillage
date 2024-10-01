import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/globals/LoadingSpinner";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état isLoading

  const onSubmit = async (data) => {
    setIsLoading(true); // Activer le spinner

    const formData = new FormData();
    formData.append("name_user", data.name_user);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("picture_user", data.picture_user[0]);

    // Contrôle de la data envoyée
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setIsLoading(false); // Désactiver le spinner une fois terminé
      navigate("/login");
    } catch (error) {
      setIsLoading(false); // Désactiver le spinner en cas d'erreur
      console.error("Erreur lors de l'inscription:", error);
      alert(
        "Erreur lors de l'inscription: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="card1 mt-10 register-page max-w-md mx-auto p-6  shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Inscription</h1>

      {/* Spinner d'attente */}
      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nom:
            </label>
            <input
              id="name"
              type="text"
              {...register("name_user", { required: "Nom obligatoire" })}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm   sm:text-sm"
            />
            {errors.name_user && (
              <p className="mt-2 text-sm decline">{errors.name_user.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Email:
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Adresse mail obligatoire" })}
              className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm   sm:text-sm"
            />
            {errors.email && (
              <p className="mt-2 text-sm decline">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Mot de passe:
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Mot de passe obligatoire",
                minLength: {
                  value: 8,
                  message: "Longueur minimale de 8 caractères",
                },
                pattern: {
                  value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                  message:
                    "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spécial",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm    sm:text-sm"
            />
            {errors.password && (
              <p className="mt-2 text-sm decline">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="picture_user" className="block text-sm font-medium">
              Image:
            </label>
            <input
              id="picture_user"
              type="file"
              {...register("picture_user", { required: "Image obligatoire" })}
              className="mt-1 block w-full text-sm file:border file:py-2 file:px-4 file:rounded-md"
            />
            {errors.picture_user && (
              <p className="mt-2 text-sm decline">
                {errors.picture_user.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 font-semibold rounded-md shadow-sm     focus:ring-offset-2"
          >
            Inscription
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
