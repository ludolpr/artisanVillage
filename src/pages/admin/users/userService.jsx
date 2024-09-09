import { api } from "../../../services/baseUrl";

export const getUsers = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

export const getUser = async (user) => {
  const response = await api.get(`/users/${user}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post(`/users`, userData);
  return response.data;
};

export const updateUser = async (user, userData) => {
  const response = await api.put(`/users/${user}`, userData);
  return response.data;
};

export const deleteUser = async (user) => {
  const response = await api.delete(`/users/${user}`);
  return response.data;
};
