import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
export const api = axios.create({
  api: API_BASE_URL,
});
