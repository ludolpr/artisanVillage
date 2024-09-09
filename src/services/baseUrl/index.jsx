import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    // Récupère le token d'accès stocké dans le localStorage du navigateur
    const token = localStorage.getItem("access_token");
    
    // Si un token existe, ajoute un header Authorization à la requête
    if (token) {
      // Le format du header est "Bearer <token>", utilisé pour l'authentification
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Retourne la configuration de la requête (éventuellement modifiée) pour continuer le processus
    return config;
  },
  (error) => {
    // Si une erreur se produit avant l'envoi de la requête, elle est rejetée et traitée
    return Promise.reject(error);
  }
);
