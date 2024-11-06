import axios from "axios";

const API_BASE_URL = "https://api.artisanvillage.fr/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    console.log("Connexion réussie:", response.data);
    // Traitement du token ou des données de l'utilisateur
    localStorage.setItem("access_token", response.data.token); // Remplacez par la clé correcte
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    // Gérer l'erreur ici (afficher un message à l'utilisateur, etc.)
  }
};
