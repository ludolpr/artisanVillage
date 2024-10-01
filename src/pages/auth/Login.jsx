import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import { api } from "../../services/baseUrl";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const { login } = useContext(UserContext);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError(null);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await api.post("http://127.0.0.1:8000/api/login", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.data.access_token.token);
        navigate(from, { replace: true });
        login(res.data.user);
      }
    } catch (err) {
      setAuthError(
        "Échec de la connexion. Veuillez vérifier vos identifiants."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card1 mt-10 login-page max-w-md mx-auto p-6  shadow-md rounded-lg">
      <h1 className="text-2xl  font-semibold mb-4">Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium ">
            Email:
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Adresse mail obligatoire" })}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm    sm:text-sm"
          />
          {errors.email && (
            <p className="mt-2 text-sm decline">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium ">
            Mot de passe:
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Mot de passe obligatoire" })}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm   sm:text-sm"
          />
          {errors.password && (
            <p className="mt-2 text-sm decline">{errors.password.message}</p>
          )}
        </div>

        {authError && <p className="mt-2 text-sm decline">{authError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 primary-500  font-semibold rounded-md shadow-sm    focus:ring-offset-2 button3"
        >
          {loading ? "Connexion en cours..." : "Connexion"}
        </button>
      </form>
    </div>
  );
};

export default Login;
