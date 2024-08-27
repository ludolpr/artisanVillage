import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setLoading(true);
    }
  }, [loading]);

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.data.access_token.token)
      );
      // console.log("data: ", data);
      setLoading(true);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setAuthError(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
      setLoading(true);
    }
  };

  return (
    <div className="mt-10 login-page max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Adresse mail obligatoire" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9a7d6b] focus:border-[#9a7d6b] sm:text-sm"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe:
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Mot de passe obligatoire" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9a7d6b] focus:border-[#9a7d6b] sm:text-sm"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {authError && <p className="mt-2 text-sm text-red-600">{authError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 primary-500 text-white font-semibold rounded-md shadow-sm hover:bg-[#9a7d6b] focus:outline-none focus:ring-2 focus:ring-[#9a7d6b] focus:ring-offset-2"
        >
          {authError
            ? "Connexion"
            : loading
            ? "Connexion en cours..."
            : "Connexion"}
        </button>
      </form>
    </div>
  );
};

export default Login;
