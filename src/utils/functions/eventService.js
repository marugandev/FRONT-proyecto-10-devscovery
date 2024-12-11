import { API } from "../API/API";

export const getEvents = async () => {
  return await API({
    endpoint: `/events`
  });
};

export const getEventById = async (id, token) => {
  return await API({
    endpoint: `/events/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: true
  });
};

export const postEvent = async (data, token) => {
  return await API({
    endpoint: `/events`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: false,
    body: data,
    method: "POST"
  });
};

export const putEvent = async (id, data, token) => {
  return await API({
    endpoint: `/events/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: false,
    body: data,
    method: "PUT"
  });
};

export const deleteEvent = async (id, token) => {
  return await API({
    endpoint: `/events/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: true,
    method: "DELETE"
  });
};
