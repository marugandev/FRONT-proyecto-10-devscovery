import { API } from "../API/API";

export const verifyToken = async (token) => {
  return await API({
    endpoint: "/users/verify",
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: true
  });
};

export const loginService = async (data) => {
  return await API({
    endpoint: "/users/login",
    isJSON: true,
    body: data,
    method: "POST"
  });
};

export const registerService = async (data) => {
  return await API({
    endpoint: "/users/register",
    isJSON: true,
    body: data,
    method: "POST"
  });
};

export const getUsers = async (token) => {
  return await API({
    endpoint: "/users",
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: true
  });
};

export const getUserById = async (id, token) => {
  return await API({
    endpoint: `/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: true
  });
};

export const putUser = async (id, data, token) => {
  return await API({
    endpoint: `/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: false,
    body: data,
    method: "PUT"
  });
};

export const deleteUser = async (id, token) => {
  return await API({
    endpoint: `/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: true,
    method: "DELETE"
  });
};
