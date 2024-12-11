import { API } from "../API/API";

export const putEventAttendees = async (eventId, data, token) => {
  return await API({
    endpoint: `/events/attendees/${eventId}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    isJSON: true,
    body: data,
    method: "PUT"
  });
};
